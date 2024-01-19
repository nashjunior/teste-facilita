import { Entity } from '../entities';
import { UniqueEntityId } from '../value-objects';
import { SearchParams } from './search-params';
import { SearchResult } from './search-result';

export type ISearchProps<Filter = string> = {
  page?: number;
  perPage?: number;
  sort?: string[];
  orderSort?: ('asc' | 'desc')[];
  filter?: Filter;
};

export interface IReadbleRepository<T extends Entity> {
  findById(id: string | UniqueEntityId): Promise<T>;
  find(): Promise<T[]>;
  findAndCount(): Promise<{ total: number; items: T[] }>;
}

export interface IRepository<T extends Entity> extends IReadbleRepository<T> {
  create(instance: T): Promise<void>;
  createBatch(instance: T[]): Promise<void>;
  update(data: T): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

export interface ISearchableRepository<
  T extends Entity,
  Filter = string,
  SearchableParams = SearchParams<Filter>,
  SearchResponse = SearchResult<T, Filter>,
> extends IRepository<T> {
  search(props: SearchableParams): Promise<SearchResponse>;
}
