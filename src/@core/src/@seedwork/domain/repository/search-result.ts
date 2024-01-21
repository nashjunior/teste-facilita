import { Entity } from '../entities';

type ISearchResultProps<E, Filter> = {
  items: E[];
  total: number;
  currentPage: number;
  perPage: number;
  sort: string[] | null;
  orderSort: string[] | null;
  filter: Filter | null;
};

export class SearchResult<E extends Entity, Filter = any> {
  readonly items: E[];
  readonly total: number;
  readonly currentPage: number;
  readonly perPage: number;
  readonly lastPage: number;
  readonly sort: string[] | null;
  readonly orderSort: string[] | null;
  readonly filter: Filter | null;

  constructor(props: ISearchResultProps<E, Filter>) {
    this.items = props.items;
    this.total = props.total;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.lastPage = Math.ceil(this.total / this.perPage);
    this.sort = props.sort ?? null;
    this.orderSort = props.orderSort ?? null;
    this.filter = props.filter ?? null;
  }

  toJSON() {
    return {
      items: this.items,
      total: this.total,
      totalPage: this.lastPage,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
      sort: this.sort,
      orderSort: this.orderSort,
      filter: this.filter,
    };
  }
}
