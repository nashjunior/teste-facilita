import { ISearchProps } from './i-repository';

export class SearchParams<Filter = any> {
  protected _page = 1;
  protected _perPage = 10;
  protected _sort: string[];
  protected _orderSort: ('asc' | 'desc')[] | null = null;
  protected _filter: Filter | null = null;

  constructor(props: ISearchProps<Filter> = {}) {
    this.page = props.page || null;
    this.perPage = props.perPage as number;
    this.sort = props.sort || null;
    this.orderSort = props.orderSort || null;
    this.filter = props.filter || null;
  }

  private set page(v: number | null) {
    let newPage = Number.parseInt(v as any, 10);

    if (Number.isNaN(newPage) || newPage <= 0) newPage = 1;
    this._page = newPage;
  }

  public get page(): number {
    return this._page;
  }

  private set perPage(v: number) {
    let newPerPage = Number.parseInt(v as any, 10);

    if (Number.isNaN(newPerPage) || newPerPage <= 0) newPerPage = 10;

    this._perPage = newPerPage;
  }

  public get perPage() {
    return this._perPage;
  }

  private set sort(v: string[] | null) {
    this._sort = v === null || v === undefined || !Array.isArray(v) ? [] : v;
  }

  public get sort() {
    return this._sort;
  }

  private set orderSort(v: ('asc' | 'desc')[] | null) {
    if (!this.sort || this.sort.length < 1) {
      this._orderSort = [];
      return;
    }

    if (v === null || v === undefined) {
      this._orderSort = [];
      return;
    }

    if (!Array.isArray(v)) {
      this._orderSort = [];
      return;
    }

    const indexSortsToRemove: number[] = [];

    const mappedOrder = v
      .map(order => order.toLowerCase())
      .filter((order, index) => {
        if (order === 'asc' || order === 'desc') return true;

        indexSortsToRemove.push(index);
        return false;
      });

    this.sort = this.sort.filter(
      (_, index) => !indexSortsToRemove.includes(index),
    );

    if (mappedOrder.length < 1) {
      this._orderSort = [];
      return;
    }

    this._orderSort = mappedOrder as ('asc' | 'desc')[];
  }

  public get orderSort() {
    return this._orderSort;
  }

  private set filter(v: Filter | null) {
    this._filter =
      v === null || v === undefined || v.toString().trim() === ''
        ? null
        : (v.toString() as Filter);
  }

  public get filter(): Filter | null {
    return this._filter;
  }
}
