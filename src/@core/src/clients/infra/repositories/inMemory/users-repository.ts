import { User } from '#clients/domain/entities';
import { UsersRepository } from '#clients/domain/repository';
import { InMemorySearchbleRepository } from '#seedwork/domain/repository';

export class UsersInMemoryRepository
  extends InMemorySearchbleRepository<User>
  implements UsersRepository.Repository
{
  protected async applyFilter(
    items: User[],
    filter: UsersRepository.Filter,
  ): Promise<User[]> {
    return items.filter(
      i =>
        i.props.name.toLowerCase().includes(filter.toLowerCase()) ||
        i.props.username.toLowerCase().includes(filter.toLowerCase()),
    );
  }
}
