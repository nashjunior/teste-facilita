import { SearchParams } from '../search-params';

describe('Search params unit tests', () => {
  it('should handle page prop', () => {
    const arrange = [
      { page: null, expected: 1 },
      { page: undefined, expected: 1 },
      { page: '', expected: 1 },
      { page: -1, expected: 1 },
      { page: {}, expected: 1 },
      { page: true, expected: 1 },
      { page: 5.1, expected: 5 },
    ];

    arrange.forEach(validation => {
      const params = new SearchParams({ page: validation.page as any });
      expect(params.page).toBe(validation.expected);
    });
  });

  it('should handle perPage prop', () => {
    const arrange = [
      { perPage: null, expected: 10 },
      { perPage: undefined, expected: 10 },
      { perPage: '', expected: 10 },
      { perPage: -1, expected: 10 },
      { perPage: {}, expected: 10 },
      { perPage: true, expected: 10 },
      { perPage: 5.1, expected: 5 },
    ];

    arrange.forEach(validation => {
      const params = new SearchParams({ perPage: validation.perPage as any });
      expect(params.perPage).toBe(validation.expected);
    });
  });

  it('should handle sort prop', () => {
    const arrange = [
      { sort: null, expected: [] },
      { sort: undefined, expected: [] },
      { sort: '', expected: [] },
      { sort: -1, expected: [] },
      { sort: {}, expected: [] },
      { sort: true, expected: [] },
      { sort: 5.1, expected: [] },
      { sort: [], expected: [] },
      { sort: ['asdf'], expected: ['asdf'] },
    ];

    arrange.forEach(validation => {
      const params = new SearchParams({ sort: validation.sort as any });
      expect(params.sort).toStrictEqual(validation.expected);
    });
  });

  it('should handle orderSort prop', () => {
    const arrange = [
      { orderSort: null, expected: [] },
      { orderSort: undefined, expected: [] },
      { orderSort: '', expected: [] },
      { orderSort: -1, expected: [] },
      { orderSort: {}, expected: [] },
      { orderSort: true, expected: [] },
      { orderSort: 5.1, expected: [] },
      { orderSort: [], expected: [] },
      { orderSort: ['asdf'], expected: [] },
      { orderSort: ['asc'], expected: [] },
      { sort: ['asdfasdf'], orderSort: ['asc'], expected: ['asc'] },
      { sort: ['asdfasdf'], orderSort: ['ASC'], expected: ['asc'] },
    ];

    arrange.forEach(validation => {
      const params = new SearchParams({
        orderSort: validation.orderSort as any,
        sort: validation?.sort,
      });

      expect(params.orderSort).toStrictEqual(validation.expected);
    });

    expect(
      new SearchParams({ sort: ['ascauehaueh'], orderSort: ['auehuah'] as any })
        .sort,
    ).toStrictEqual([]);
  });

  it('should handle filter prop', () => {
    const arrange = [
      { filter: null, expected: null },
      { filter: undefined, expected: null },
      { filter: '', expected: null },
      { filter: -1, expected: '-1' },
      { filter: {}, expected: '[object Object]' },
      { filter: true, expected: 'true' },
      { filter: [], expected: null },
      { filter: 5.1, expected: '5.1' },
    ];

    arrange.forEach(validation => {
      const params = new SearchParams({ filter: validation.filter as any });
      expect(params.filter).toBe(validation.expected);
    });
  });
});
