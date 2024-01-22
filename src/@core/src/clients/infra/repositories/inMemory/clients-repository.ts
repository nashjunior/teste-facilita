import { Client } from '#clients/domain/entities';
import { ClientsRepository } from '#clients/domain/repository';
import { InMemorySearchbleRepository } from '#seedwork/domain/repository';

export class ClientsInMemoryRepository
  extends InMemorySearchbleRepository<Client>
  implements ClientsRepository.Repository
{
  async findByEmail(email: string): Promise<Client | undefined> {
    return this.items.find(
      item => item.email === email && item.deleted === false,
    );
  }
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
