import { Client } from '#clients/domain/entities';
import { EmailAlreadyExistentError } from '#clients/domain/errors/email-already-existent';
import { ClientsRepository } from '#clients/domain/repository';
import { InMemorySearchbleRepository } from '#seedwork/domain/repository';

export class ClientsInMemoryRepository
  extends InMemorySearchbleRepository<Client>
  implements ClientsRepository.Repository
{
  async findByEmail(email: string): Promise<void> {
    if (this.items.find(item => item.email === email && item.deleted === false))
      throw new EmailAlreadyExistentError(email);
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
