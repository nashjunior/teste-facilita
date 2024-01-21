import { Client } from '#clients/domain/entities';
import { ClientsRepository } from '#clients/domain/repository';
import { Database } from '#clients/infra/db'; // Ajuste o caminho de importação conforme necessário
import { NotFoundError, UniqueEntityId } from '#seedwork/domain';

export class ClientRepository implements ClientsRepository.Repository {
  protected applyFilter(filter: ClientsRepository.Filter | null): string {
    if (filter == null) return '';
    if (filter.fields.length < 1) return '';

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

  protected applyPagination(filter: ClientsRepository.SearchParams): string {
    return ` OFFSET ${filter.page * filter.perPage - filter.perPage} LIMIT ${
      filter.perPage
    }`;
  }

  protected applySort(filter: ClientsRepository.SearchParams): string {
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
    props: ClientsRepository.SearchParams,
  ): Promise<ClientsRepository.SearchResult> {
    const baseQueryFromClients = 'FROM clients c where c.deleted = false';

    const queryFindItems = `SELECT c.* ${baseQueryFromClients}`;
    const queryCountItems = `SELECT COUNT(c.*) ${baseQueryFromClients}`;

    const stringApplyFilter = this.applyFilter(props._filter);
    const stringApplySort = this.applySort(props);
    const stringApplyPagination = this.applyPagination(props);

    const finalQuerySelectAll = queryFindItems
      .concat(stringApplyFilter)
      .concat(stringApplySort)
      .concat(stringApplyPagination);

    const finalQueryCountAll = queryCountItems.concat(stringApplyFilter);

    console.log({
      finalQueryCountAll,
      finalQuerySelectAll,
    });

    const paramsQuery = [
      ...Object.values(props._filter?.fields ?? []),
      props._filter?.query,
    ].filter(f => !!f);

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

    return new ClientsRepository.SearchResult({
      items: [],
      total: 1,
      filter: props.filter,
      sort: props.sort,
      orderSort: props.orderSort,
      currentPage: props.page,
      perPage: props.perPage,
    });
  }

  async createBatch(instances: Client[]): Promise<void> {
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
        element.name,
        element.email,
        element.phoneNumber,
        element.createdAt,
        null,
        false,
      );
    }

    const query = `
    INSERT INTO clients (id, name, email, phone_number, created_at, updated_at, deleted)
    VALUES ${parametersNumbers}
  `;

    await Database.getInstance().query(query, parameters);
  }

  async create(client: Client): Promise<void> {
    const query = `
      INSERT INTO clients (id, name, email, phone_number, created_at, updated_at, deleted)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const parameters = [
      client.uuid,
      client.name,
      client.email,
      client.phoneNumber,
      new Date(),
      null,
      false,
    ];

    await Database.getInstance().query(query, parameters);
  }

  async update(client: Client): Promise<void> {
    const query = `
    UPDATE table clients set( name, email, phone_number,  updated_at)
    VALUES ($2, $3, $4, $5) WHERE id=$1 and deleted = false
  `;
    const parameters = [
      client.uuid,
      client.name,
      client.email,
      client.phoneNumber,
      new Date(),
    ];

    await Database.getInstance().query(query, parameters);
  }

  async findById(id: UniqueEntityId | string): Promise<Client> {
    const query = `SELECT * from clients  WHERE id=$1 and deleted=false`;
    const parameters = [typeof id === 'string' ? id : id.value];
    const response = await Database.getInstance().query(query, parameters);
    if (response.rows.length < 1) throw new NotFoundError('User not found');

    return Client.create(
      {
        name: response.rows[0].name,
        email: response.rows[0].email,
        phoneNumber: response.rows[0].phone_number,
      },
      new UniqueEntityId(response.rows[0].id),
      {
        createdAt: new Date(response.rows[0].created_at),
        updatedAt: response.rows[0].updatedAt,
        deleted: response.rows[0].deleted,
      },
    );
  }

  async findByEmail(email: string): Promise<Client | undefined> {
    const query = `SELECT * from clients  WHERE email=$1 and deleted=false`;
    const parameters = [email];

    const response = await Database.getInstance().query(query, parameters);

    if (response.rows.length < 1) return undefined;

    return Client.create(
      {
        name: response.rows[0].name,
        email: response.rows[0].email,
        phoneNumber: response.rows[0].phone_number,
      },
      new UniqueEntityId(response.rows[0].id),
      {
        createdAt: new Date(response.rows[0].created_at),
        updatedAt: response.rows[0].updatedAt,
        deleted: response.rows[0].deleted,
      },
    );
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const queryDeleteClientCoordinates = `
    UPDATE clients_coordinates
      SET deleted = true, updated_at = $2
    WHERE client_id = $1 and deleted = false
    `;

    const queryDeleteClient = `
      UPDATE clients
      SET deleted = true, updated_at = $2
      WHERE id = $1 and deleted = false
    `;

    const stringId = typeof id === 'string' ? id : id.value;

    const parameters = [stringId, new Date()];

    await Database.getInstance().query(
      queryDeleteClientCoordinates,
      parameters,
    );

    const response = await Database.getInstance().query(
      queryDeleteClient,
      parameters,
    );

    if (response.rowCount != null && response.rowCount < 1)
      throw new NotFoundError(`Item not found using id ${stringId}`);
  }

  async find(): Promise<Client[]> {
    const query = `SELECT * from clients WHERE deleted=false`;

    const response = await Database.getInstance().query(query);

    return Promise.all(
      response.rows.map(row =>
        Client.create(
          { name: row.name, email: row.email, phoneNumber: row.phone_number },
          new UniqueEntityId(row.id),
          {
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deleted: row.deleted,
          },
        ),
      ),
    );
    // ... implementação similar ao método create
  }

  // Outros métodos como findById, findAll, etc., podem ser adicionados conforme necessário
}
