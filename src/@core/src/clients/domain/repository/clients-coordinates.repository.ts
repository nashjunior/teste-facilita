/* eslint-disable @typescript-eslint/naming-convention */
import { SearchResult as DefaultResult } from '#seedwork/domain/repository/search-result';
import {
  ISearchableRepository,
  SearchParams as DefaultParams,
} from '#seedwork/domain/repository';
import { ClientCoordinate } from '../entities';
import { UniqueEntityId } from '#seedwork/domain';

export type Filter = { query: string; fields: string[] };
export class SearchParams extends DefaultParams<Filter> {}
export class SearchResult extends DefaultResult<ClientCoordinate, Filter> {}

export type Repository = ISearchableRepository<
  ClientCoordinate,
  Filter,
  SearchParams,
  SearchResult
> & {
  findByIdClient(
    id: string | UniqueEntityId,
  ): Promise<ClientCoordinate | undefined>;
};
