import { Entity, IAuditJSONProps } from '../../entities';
import { InMemorySearchbleRepository } from '../abstract-in-memory.repository';

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

class StubInMemorySearchRepository extends InMemorySearchbleRepository<StubEntity> {
  protected async applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): Promise<StubEntity[]> {
    if (!filter) return items;

    return items.filter(
      i =>
        i.props.name.toLowerCase().includes(filter.toLowerCase()) ||
        i.props.price.toString() === filter,
    );
  }
}

describe('InMemorySearchRepository unit tests', () => {
  let repo: StubInMemorySearchRepository;

  beforeEach(() => {
    repo = new StubInMemorySearchRepository();
  });

  describe('Apply Filter Method', () => {
    it('should not filter items when filter param is null', async () => {
      const items = [
        new StubEntity({ name: 'name1', price: 5 }),
        new StubEntity({ name: 'name2', price: 6 }),
        new StubEntity({ name: 'name3', price: 7 }),
        new StubEntity({ name: 'name4', price: 8 }),
        new StubEntity({ name: 'name5', price: 9 }),
        new StubEntity({ name: 'name6', price: 0 }),
      ];

      const applyFilterSpy = jest.spyOn(items, 'filter');
      const filteredItem = await repo['applyFilter'](items, null);

      expect(filteredItem).toStrictEqual(items);
      expect(applyFilterSpy).not.toHaveBeenCalled();
    });

    it('should filter using a filter param', async () => {
      const items = [
        new StubEntity({ name: 'name1', price: 5 }),
        new StubEntity({ name: 'name2', price: 6 }),
        new StubEntity({ name: 'name3', price: 7 }),
        new StubEntity({ name: 'name4', price: 8 }),
        new StubEntity({ name: 'name5', price: 9 }),
        new StubEntity({ name: 'name6', price: 0 }),
      ];

      const applyFilterSpy = jest.spyOn(items, 'filter');
      let filteredItem = await repo['applyFilter'](items, 'name1');

      expect(filteredItem).toStrictEqual([items[0]]);
      expect(applyFilterSpy).toHaveBeenCalledTimes(1);

      filteredItem = await repo['applyFilter'](items, '5');

      expect(filteredItem).toStrictEqual([items[0], items[4]]);
    });
  });

  describe('Apply Sort Method', () => {
    it('should not sort items', async () => {
      const items = [
        new StubEntity({ name: 'name1', price: 5 }),
        new StubEntity({ name: 'name2', price: 6 }),
        new StubEntity({ name: 'name3', price: 7 }),
        new StubEntity({ name: 'name4', price: 8 }),
        new StubEntity({ name: 'name5', price: 9 }),
        new StubEntity({ name: 'name6', price: 0 }),
      ];

      const applyFilterSpy = jest.spyOn(items, 'sort');
      const applyReduceSpy = jest.spyOn(Array.prototype, 'reduce');

      let sortedItems = await repo['applySort'](items, null as any, ['asc']);
      expect(sortedItems).toStrictEqual(items);
      expect(applyFilterSpy).not.toHaveBeenCalled();
      expect(applyReduceSpy).not.toHaveBeenCalled();

      sortedItems = await repo['applySort'](items, [], null);
      expect(applyFilterSpy).not.toHaveBeenCalled();
      expect(applyReduceSpy).not.toHaveBeenCalled();
      expect(sortedItems).toStrictEqual(items);

      sortedItems = await repo['applySort'](items, ['some-value'], ['asc']);
      expect(applyFilterSpy).toHaveBeenCalledTimes(1);
      expect(applyReduceSpy).toHaveBeenCalledTimes(1);
      expect(sortedItems).toStrictEqual(items);
    });

    it('should sort items', async () => {
      const items = [
        new StubEntity({ name: 'name2', price: 6 }),
        new StubEntity({ name: 'name3', price: 7 }),
        new StubEntity({ name: 'name4', price: 8 }),
        new StubEntity({ name: 'name5', price: 9 }),
        new StubEntity({ name: 'name6', price: 0 }),
        new StubEntity({ name: 'name1', price: 5 }),
      ];

      const applyFilterSpy = jest.spyOn(items, 'sort');
      const applyReduceSpy = jest.spyOn(Array.prototype, 'reduce');

      const fieldsToSort = ['name'];

      let sortedItems = await repo['applySort'](items, fieldsToSort, ['asc']);

      expect(sortedItems).toStrictEqual(
        items.sort((a, b) => {
          if (a.props.name < b.props.name) return -1;

          if (a.props.name > b.props.name) return 1;

          return 0;
        }),
      );
      expect(applyFilterSpy).toHaveBeenCalledTimes(fieldsToSort.length + 1);
      expect(applyReduceSpy).toHaveBeenCalledTimes(1);

      sortedItems = await repo['applySort'](items, fieldsToSort, ['desc']);

      expect(sortedItems).toStrictEqual(
        items.sort((a, b) => {
          if (a.props.name < b.props.name) return 1;

          if (a.props.name > b.props.name) return -1;

          return 0;
        }),
      );

      sortedItems = await repo['applySort'](items, ['price'], ['asc']);
      expect(sortedItems).toStrictEqual(
        items.sort((a, b) => {
          if (a.props.price < b.props.price) return -1;

          if (a.props.price > b.props.price) return 1;

          return 0;
        }),
      );

      sortedItems = await repo['applySort'](items, ['price'], ['desc']);
      expect(sortedItems).toStrictEqual(
        items.sort((a, b) => {
          if (a.props.price < b.props.price) return 1;

          if (a.props.price > b.props.price) return -1;

          return 0;
        }),
      );

      items.push(new StubEntity({ name: 'name1', price: 0 }));
      const newFieldSort = ['name', 'price'];
      let orderSort = ['asc', 'asc'];
      sortedItems = await repo['applySort'](
        items,
        newFieldSort,
        orderSort as any,
      );
      expect(sortedItems).toStrictEqual(
        newFieldSort.reduce<Entity[]>((previousSorted, fieldSort, index) => {
          return previousSorted.sort((a, b) => {
            if (!a.props[fieldSort]) return 0;
            if (!b.props[fieldSort]) return 0;

            if (a.props[fieldSort] < b.props[fieldSort])
              return orderSort[index] === 'asc' ? -1 : 1;

            if (a.props[fieldSort] > b.props[fieldSort])
              return orderSort[index] === 'asc' ? 1 : -1;

            return 0;
          });
        }, items),
      );

      orderSort = ['asc', 'desc'];
      sortedItems = await repo['applySort'](
        items,
        newFieldSort,
        orderSort as any,
      );
      expect(sortedItems).toStrictEqual(
        newFieldSort.reduce<Entity[]>((previousSorted, fieldSort, index) => {
          return previousSorted.sort((a, b) => {
            if (!a.props[fieldSort]) return 0;
            if (!b.props[fieldSort]) return 0;

            if (a.props[fieldSort] < b.props[fieldSort])
              return orderSort[index] === 'asc' ? -1 : 1;

            if (a.props[fieldSort] > b.props[fieldSort])
              return orderSort[index] === 'asc' ? 1 : -1;

            return 0;
          });
        }, items),
      );
    });
  });

  describe('Apply Pagination Method', () => {
    it('should paginate', async () => {
      const items = [
        new StubEntity({ name: 'name1', price: 5 }),
        new StubEntity({ name: 'name2', price: 6 }),
        new StubEntity({ name: 'name3', price: 7 }),
        new StubEntity({ name: 'name4', price: 8 }),
        new StubEntity({ name: 'name5', price: 9 }),
        new StubEntity({ name: 'name6', price: 0 }),
      ];

      const applyFilterSpy = jest.spyOn(items, 'slice');

      let filteredItem = await repo['applyPagination'](items, 1, 2);
      expect(applyFilterSpy).toHaveBeenCalledTimes(1);
      expect(filteredItem).toStrictEqual(items.slice(0, 2));

      filteredItem = await repo['applyPagination'](items, 2, 2);
      expect(filteredItem).toStrictEqual(items.slice(2, 4));

      filteredItem = await repo['applyPagination'](items, 6, 2);
      expect(filteredItem).toStrictEqual([]);
    });
  });
});
