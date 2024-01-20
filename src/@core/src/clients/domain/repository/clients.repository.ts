/* eslint-disable @typescript-eslint/naming-convention */
import { SearchResult as DefaultResult } from '#seedwork/domain/repository/search-result';
import {
  ISearchableRepository,
  SearchParams as DefaultParams,
} from '#seedwork/domain/repository';
import { Client } from '../entities';

export type Filter = string;
export class SearchParams extends DefaultParams<Filter> {}
export class SearchResult extends DefaultResult<Client, Filter> {}

export type Repository = ISearchableRepository<
  Client,
  Filter,
  SearchParams,
  SearchResult
>;