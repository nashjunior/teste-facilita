import { Client } from '#clients/domain/entities';
import { ClientsRepository } from '#clients/domain/repository';
import { InMemorySearchbleRepository } from '#seedwork/domain/repository';

export class ClientsInMemoryRepository
  extends InMemorySearchbleRepository<Client>
  implements ClientsRepository.Repository
{
  protected async applyFilter(
    items: Client[],
    filter: ClientsRepository.Filter,
  ): Promise<Client[]> {
    if (!filter) {
      return items;
    }
    const lowerCaseFilter = filter.query.toLowerCase();
    return items.filter(
      i =>
        i.props.name.toLowerCase().includes(lowerCaseFilter) ||
        i.props.email.toLowerCase().includes(lowerCaseFilter),
    );
  }
}
