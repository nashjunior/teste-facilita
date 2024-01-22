import { NotFoundError } from '../../../../@seedwork/domain/errors/not-found-error';
import { Entity, IAuditJSONProps } from '../../../../@seedwork/domain/entities';
import { InMemoryRepository } from '../abstract-in-memory.repository';
import { SearchResult } from '../search-result';

type IStubEntityProps = { name: string; price: number };

class StubEntity extends Entity<IStubEntityProps> {
  toJSON(): Required<{ id: string }> & IStubEntityProps & IAuditJSONProps {
    return {
      id: this.uuid,
      name: this.props.name,
      price: this.props.price,

      ...this.jsonAudit,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });

  it('should insert new Entity', async () => {
    const entity = new StubEntity({ name: 'asd', price: 5 });

    await repo.create(entity);

    expect(entity.toJSON()).toStrictEqual(repo.items[0].toJSON());
  });

  it('should throw an error on entity not found', async () => {
    expect(repo.findById('some id')).rejects.toThrow(NotFoundError);
  });

  it('should return a valid entity on find by id', async () => {
    const entity = new StubEntity({ name: 'asd', price: 5 });

    await repo.create(entity);

    expect((await repo.findById(entity.uuid)).toJSON()).toStrictEqual(
      entity.toJSON(),
    );
    expect((await repo.findById(entity.uniqueEntityID)).toJSON()).toStrictEqual(
      entity.toJSON(),
    );
  });

  it('should return all entities', async () => {
    const entity = new StubEntity({ name: 'asd', price: 5 });

    await repo.create(entity);

    expect(await repo.find()).toStrictEqual([entity]);
  });

  it('should throw an error on update when entity not found', async () => {
    const entity = new StubEntity({ name: 'asd', price: 5 });

    expect(repo.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity not found using id ${entity.uuid}`),
    );
  });

  it('should throw an error on delete when entity not found', async () => {
    const entity = new StubEntity({ name: 'asd', price: 5 });

    expect(repo.delete(entity.uuid)).rejects.toThrow(
      new NotFoundError(`Entity not found using id ${entity.uuid}`),
    );

    expect(repo.delete(entity.uniqueEntityID)).rejects.toThrow(
      new NotFoundError(`Entity not found using id ${entity.uuid}`),
    );
  });

  it('should update a entity', async () => {
    const entity = new StubEntity({ name: 'asd', price: 5 });

    await repo.create(entity);

    const updatedEntity = new StubEntity(
      { name: 'new val', price: 5 },
      entity.uniqueEntityID,
    );

    repo.update(updatedEntity);

    expect((await repo.findById(updatedEntity.uuid)).toJSON()).toStrictEqual(
      updatedEntity.toJSON(),
    );
  });

  it('should delete a entity', async () => {
    const entity = new StubEntity({ name: 'asd', price: 5 });

    await repo.create(entity);

    await repo.delete(entity.uniqueEntityID);

    expect(repo.items).toHaveLength(0);
  });
});

describe('Search result unit tests', () => {
  it('should handle constructor props', () => {
    [
      {
        items: ['entity 1', 'entity 2'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: null,
        orderSort: null,
        filter: null,
      },
      {
        items: ['entity 1', 'entity 2'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: ['name'],
        orderSort: ['asc'],
        filter: 'test',
      },
    ].forEach(props => {
      const searchResult = new SearchResult(props);
      expect(searchResult.toJSON()).toStrictEqual({
        ...props,
        totalPage: 2,
        lastPage: Math.ceil(props.total / props.perPage),
      });
    });
  });

  it('should set lastPage 1 on perPage is greater than total field', () => {
    const result = new SearchResult({
      items: ['entity 1', 'entity 2'] as any,
      total: 4,
      currentPage: 1,
      perPage: 15,
      sort: null,
      orderSort: null,
      filter: null,
    });

    expect(result.lastPage).toBe(1);
  });

  it('should next integer multiple of total/perPage when total is not multiple o perPage on lastPage', () => {
    const result = new SearchResult({
      items: ['entity 1', 'entity 2'] as any,
      total: 4,
      currentPage: 1,
      perPage: 3,
      sort: null,
      orderSort: null,
      filter: null,
    });

    expect(result.lastPage).toBe(2);
  });
});
