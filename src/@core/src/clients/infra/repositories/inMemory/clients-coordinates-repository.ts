import { ClientCoordinate } from '#clients/domain/entities';
import { ClientsCoordinatesRepository } from '#clients/domain/repository';
import { InMemorySearchbleRepository } from '#seedwork/domain/repository';

export class ClientsInMemoryRepository
  extends InMemorySearchbleRepository<ClientCoordinate>
  implements ClientsCoordinatesRepository.Repository
{
  protected async applyFilter(
    items: ClientCoordinate[],
    filter: ClientsCoordinatesRepository.Filter,
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
