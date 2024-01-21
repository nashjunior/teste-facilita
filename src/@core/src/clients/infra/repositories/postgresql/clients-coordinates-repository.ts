import { Database } from '#clients/infra/db';
import { ClientCoordinate } from '#clients/domain/entities/client-coordinates';
import { ClientsCoordinatesRepository } from '#clients/domain/repository';
import { NotFoundError, UniqueEntityId } from '#seedwork/domain';
import { Client } from '#clients/domain';

export class ClientCoordinatesRepository
  implements ClientsCoordinatesRepository.Repository
{
  protected applyFilter(
    filter: ClientsCoordinatesRepository.Filter | null,
  ): string {
    if (filter == null) return '';

    const queryParams = filter.fields
      .map(
        (f, index) => `($${index + 1} ILIKE $${
          (filter?.fields.length ?? 1) + 1
        })
    `,
      )
      .join(' OR ');

    return ` AND (${queryParams})`;
  }

  protected applyPagination(
    filter: ClientsCoordinatesRepository.SearchParams,
  ): string {
    return ` OFFSET ${filter.page * filter.perPage - filter.perPage} LIMIT ${
      filter.perPage
    }`;
  }

  protected applySort(
    filter: ClientsCoordinatesRepository.SearchParams,
  ): string {
    if (filter.orderSort == null || filter.sort == null) return '';
    //feito condicionar apenas por causa da tipagem, poderia incluir em um único if
    if (
      filter.orderSort.length < 1 ||
      filter.sort.length < 1 ||
      filter.orderSort.length !== filter.sort.length
    )
      return '';

    const mappedOrderBy: string = filter.sort
      .map((f, index) => ` ${f} ${filter.orderSort?.[index]}`)
      .join(',');

    return ` ORDER BY ${mappedOrderBy}`;
  }

  async search(
    props: ClientsCoordinatesRepository.SearchParams,
  ): Promise<ClientsCoordinatesRepository.SearchResult> {
    const baseQueryJoinClients = `
    FROM clients_coordinates cc
      join clients c on cc.client_id = c.id
    WHERE cc.deleted = false`;

    const queryFindItems = `
    SELECT
    cc.*,
    c.name,
    c.email,
    c.phone_number,
    c.deleted as deleted_client,
    c.created_at as created_at_client,
    c.updated_at as updated_at_client
    ${baseQueryJoinClients}
    `;
    const queryCountItems = `SELECT COUNT(cc.*) ${baseQueryJoinClients}`;

    const stringApplyFilter = this.applyFilter(props._filter);
    const stringApplySort = this.applySort(props);
    const stringApplyPagination = this.applyPagination(props);

    const finalQuerySelectAll = queryFindItems
      .concat(stringApplyFilter)
      .concat(stringApplySort)
      .concat(stringApplyPagination);

    const finalQueryCountAll = queryCountItems
      .concat(stringApplyFilter)
      .concat(stringApplyPagination);

    const paramsQuery = [
      ...Object.values(props._filter?.fields ?? []),
      props._filter?.query,
    ];

    const [response] = await Promise.all([
      Database.getInstance().query(
        finalQuerySelectAll,
        paramsQuery.length > 0 ? paramsQuery : undefined,
      ),
      Database.getInstance().query(
        finalQueryCountAll,
        paramsQuery.length > 0 ? paramsQuery : undefined,
      ),
    ]);

    return new ClientsCoordinatesRepository.SearchResult({
      items: [],
      total: 1,
      filter: props.filter,
      sort: props.sort,
      orderSort: props.orderSort,
      currentPage: props.page,
      perPage: props.perPage,
    });
  }

  async createBatch(instances: ClientCoordinate[]): Promise<void> {
    let parametersNumbers = '';
    const parameters: any[] = [];

    for (let index = 0; index < instances.length; index++) {
      const element = instances[index];

      //generating parameters indexes
      parametersNumbers = parametersNumbers.concat(
        `(
        $${(index + 1) * 7 - 6},
        $${(index + 1) * 7 - 5},
        $${(index + 1) * 7 - 4},
        $${(index + 1) * 7 - 3},
        $${(index + 1) * 7 - 2},
        $${(index + 1) * 7 - 1},
        $${(index + 1) * 7}
      )`,
      );

      if (index !== instances.length - 1)
        parametersNumbers = parametersNumbers.concat(',');

      parameters.push(
        element.uuid,
        element.client.uuid,
        element.latitude,
        element.longitude,
        element.createdAt,
        null,
        false,
      );
    }

    const query = `
    INSERT INTO clients_coordinates (id, client_id, latitude, longitude, created_at, updated_at, deleted)
    VALUES ${parametersNumbers}
  `;

    await Database.getInstance().query(query, parameters);
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const query = `
    UPDATE clients_coordinates
    SET deleted = true, updated_at = $2
    WHERE id = $1 and deleted = false
  `;

    const stringId = typeof id === 'string' ? id : id.value;

    const parameters = [stringId, new Date()];

    const response = await Database.getInstance().query(query, parameters);

    if (response.rowCount != null && response.rowCount < 1)
      throw new NotFoundError(`Item not found using id ${stringId}`);
  }

  async find(): Promise<ClientCoordinate[]> {
    const query = `SELECT
    cc.*,
    c.name,
    c.email,
    c.phone_number,
    c.deleted as deleted_client,
    c.created_at as created_at_client,
    c.updated_at as updated_at_client
    FROM clients_coordinates cc
      join clients c on cc.client_id = c.id
    WHERE cc.deleted = false and c.deleted = false`;

    const response = await Database.getInstance().query(query);

    return Promise.all(
      response.rows.map(async row => {
        const client = await Client.create(
          { name: row.name, email: row.email, phoneNumber: row.phone_number },
          new UniqueEntityId(row.client_id),
          {
            createdAt: row.created_at_client,
            updatedAt: row.updated_at_client,
            deleted: row.deleted_client,
          },
        );

        return ClientCoordinate.create(
          client,
          { latitude: row.latitude, longitude: row.longitude },
          new UniqueEntityId(row.id),
          {
            createdAt: row.created_at,
            deleted: row.deleted,
            updatedAt: row.updated_at,
          },
        );
      }),
    );
  }
  findAndCount(): Promise<{ total: number; items: ClientCoordinate[] }> {
    throw new Error('Method not implemented.');
  }
  async create(clientCoordinate: ClientCoordinate): Promise<void> {
    const query = `
      INSERT INTO clients_coordinates (id, client_id, latitude, longitude, created_at, updated_at, deleted)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [
      clientCoordinate.uuid,
      clientCoordinate.client.uuid,
      clientCoordinate.latitude,
      clientCoordinate.longitude,
      clientCoordinate.createdAt,
      null,
      false,
    ];
    await Database.getInstance().query(query, values);
  }

  async update(clientCoordinate: ClientCoordinate): Promise<void> {
    const query = `
      UPDATE clients_coordinates
      SET latitude = $2, longitude = $3, updated_at = $4
      WHERE id = $1
    `;
    const values = [
      clientCoordinate.uuid,
      clientCoordinate.latitude,
      clientCoordinate.longitude,
      new Date(),
    ];
    await Database.getInstance().query(query, values);
  }

  async findById(id: UniqueEntityId | string): Promise<ClientCoordinate> {
    const query = `SELECT
    cc.*,
    c.name,
    c.email,
    c.phone_number,
    c.deleted as deleted_client,
    c.created_at as created_at_client,
    c.updated_at as updated_at_client
    FROM clients_coordinates cc
      join clients c on cc.client_id = c.id
    WHERE cc.id = $1 and cc.deleted = false`;
    const values = [typeof id === 'string' ? id : id.value];

    const response = await Database.getInstance().query(query, values);
    if (response.rows.length === 0)
      throw new NotFoundError(`Item not found using id ${id}`);

    const row = response.rows[0];

    const client = await Client.create(
      { name: row.name, email: row.email, phoneNumber: row.phone_number },
      new UniqueEntityId(row.client_id),
      {
        createdAt: row.created_at_client,
        updatedAt: row.updated_at_client,
        deleted: row.deleted_client,
      },
    );

    return ClientCoordinate.create(
      client,
      { latitude: row.latitude, longitude: row.longitude },
      new UniqueEntityId(row.id),
      {
        createdAt: row.created_at,
        deleted: row.deleted,
        updatedAt: row.updated_at,
      },
    );
  }

  // Implemente outros métodos como delete, find, etc., conforme necessário
}
