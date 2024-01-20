/* eslint-disable @typescript-eslint/naming-convention */
import { SearchResult as DefaultResult } from '#seedwork/domain/repository/search-result';
import {
  ISearchableRepository,
  SearchParams as DefaultParams,
} from '#seedwork/domain/repository';
import { ClientCoordinate } from '../entities';

export type Filter = { query: string };
export class SearchParams extends DefaultParams<Filter> {}
export class SearchResult extends DefaultResult<ClientCoordinate, Filter> {}

export type Repository = ISearchableRepository<
  ClientCoordinate,
  Filter,
  SearchParams,
  SearchResult
>;
