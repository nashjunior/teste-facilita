import { ClientCoordinate } from '#clients/domain/entities';
import { ClientsCoordinatesRepository as ClientsCoordinatesRepositoryContract } from '#clients/domain/repository';
import { UniqueEntityId } from '#seedwork/domain';
import { InMemorySearchbleRepository } from '#seedwork/domain/repository';

export class ClientsCoordinatesInMemoryRepository
  extends InMemorySearchbleRepository<ClientCoordinate>
  implements ClientsCoordinatesRepositoryContract.Repository
{
  findByIdClient(id: string | UniqueEntityId): Promise<ClientCoordinate> {
    return this.items.find(item =>
      typeof id === 'string'
        ? item.client.uuid === id
        : item.client.uuid === id.uuid,
    );
  }
  protected async applyFilter(
    items: ClientCoordinate[],
    filter: ClientsCoordinatesRepositoryContract.Filter,
  ): Promise<ClientCoordinate[]> {
    if (!filter) {
      return items;
    }
    const lowerCaseFilter = filter.query.toLowerCase();
    return items.filter(
      i =>
        i.client.name.toLowerCase().includes(lowerCaseFilter) ||
        i.client.email.toLowerCase().includes(lowerCaseFilter),
    );
  }
}
