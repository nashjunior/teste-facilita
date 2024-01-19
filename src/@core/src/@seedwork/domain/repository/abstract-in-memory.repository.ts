import { Entity } from '../entities';
import { NotFoundError } from '../errors/not-found-error';
import { UniqueEntityId } from '../value-objects';
import { IRepository, ISearchableRepository } from './i-repository';
import { SearchParams } from './search-params';
import { SearchResult } from './search-result';

export abstract class InMemoryRepository<T extends Entity>
  implements IRepository<T>
{
  items: T[] = [];

  async create(instance: T): Promise<void> {
    this.items.push(instance);
  }
  async createBatch(instance: T[]) {
    this.items.push(...instance);
  }

  async findById(id: string | UniqueEntityId): Promise<T> {
    let uuid: string;

    if (typeof id === 'string') uuid = id;
    else uuid = id.value;

    return this.items[await this._get(uuid)];
  }

  async find(): Promise<T[]> {
    return this.items;
  }
  async findAndCount(): Promise<{ total: number; items: T[] }> {
    return { items: this.items, total: this.items.length };
  }
  async update(data: T): Promise<void> {
    this.items[await this._get(data.uuid)] = data;
  }
  async delete(id: string | UniqueEntityId): Promise<void> {
    let uuid: string;

    if (typeof id === 'string') uuid = id;
    else uuid = id.value;

    this.items.splice(await this._get(uuid), 1);
  }

  protected async _get(id: string) {
    const index = this.items.findIndex(e => e.uuid === id);

    if (index < 0) throw new NotFoundError(`Entity not found using id ${id}`);

    return index;
  }
}

export abstract class InMemorySearchbleRepository<T extends Entity>
  extends InMemoryRepository<T>
  implements ISearchableRepository<T, any, any, any>
{
  async search(props: SearchParams): Promise<SearchResult<T>> {
    const filteredItems = await this.applyFilter(this.items, props.filter);
    let sortedItems = filteredItems;
    if (props.sort && props.orderSort)
      sortedItems = await this.applySort(
        sortedItems,
        props.sort,
        props.orderSort,
      );

    const paginatedItems = await this.applyPagination(
      sortedItems,
      props.page,
      props.perPage,
    );

    return new SearchResult({
      items: paginatedItems,
      total: sortedItems.length,
      currentPage: props.page,
      perPage: props.perPage,
      sort: props.sort,
      orderSort: props.orderSort,
      filter: props.filter as any,
    });
  }

  protected abstract applyFilter(
    items: T[],
    filter: SearchParams['_filter'],
  ): Promise<T[]>;

  protected async applySort(
    items: T[],
    sort: SearchParams['sort'],
    orderSort: SearchParams['orderSort'],
  ): Promise<T[]> {
    if (!sort) return items;
    if (!orderSort) return items;

    return sort.reduce<T[]>((previousSorted, fieldSort, index) => {
      return previousSorted.sort((a, b) => {
        if (!a.props[fieldSort]) return 0;
        if (!b.props[fieldSort]) return 0;

        if (a.props[fieldSort] < b.props[fieldSort])
          return orderSort[index] === 'asc' ? -1 : 1;

        if (a.props[fieldSort] > b.props[fieldSort])
          return orderSort[index] === 'asc' ? 1 : -1;

        return 0;
      });
    }, items);
  }

  protected async applyPagination(
    items: T[],
    page: SearchParams['page'],
    perPage: SearchParams['perPage'],
  ): Promise<T[]> {
    const offset = (page - 1) * perPage;
    const limit = offset + perPage;
    return items.slice(offset, limit);
  }
}
