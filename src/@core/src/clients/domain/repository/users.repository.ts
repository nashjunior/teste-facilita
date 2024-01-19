/* eslint-disable @typescript-eslint/naming-convention */
import { SearchResult as DefaultResult } from '#seedwork/domain/repository/search-result';
import {
  ISearchableRepository,
  SearchParams as DefaultParams,
} from '../../../@seedwork/domain/repository';
import { User } from '../entities';

export type Filter = string;
export class SearchParams extends DefaultParams<Filter> {}
export class SearchResult extends DefaultResult<User, Filter> {}
// eslint-disable-next-line @typescript-eslint/naming-convention
export type Repository = ISearchableRepository<
  User,
  Filter,
  SearchParams,
  SearchResult
>;
