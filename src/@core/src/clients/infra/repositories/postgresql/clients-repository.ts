import { Client } from '#clients/domain/entities';
import { ClientsRepository } from '#clients/domain/repository';
import { Database } from '#clients/infra/db'; // Ajuste o caminho de importação conforme necessário
import { InvalidUUIDError, UniqueEntityId } from '#seedwork/domain';

export class ClientRepository implements ClientsRepository.Repository {
  findAndCount(): Promise<{ total: number; items: Client[] }> {
    throw new Error('Method not implemted');
  }

  search(
    props: ClientsRepository.SearchParams,
  ): Promise<ClientsRepository.SearchResult> {
    throw new Error('Method not implemted');
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
    if (response.rows.length < 1) throw new InvalidUUIDError();

    const client = await Client.create(
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
    return client;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const query = `
      UPDATE clients
      SET deleted = true, updated_at = $2
      WHERE id = $1 and deleted = false
    `;

    const parameters = [typeof id === 'string' ? id : id.value, new Date()];

    await Database.getInstance().query(query, parameters);
  }

  async find(filter: ClientsRepository.Filter): Promise<Client[]> {
    // ... implementação similar ao método create
  }

  // Outros métodos como findById, findAll, etc., podem ser adicionados conforme necessário
}
