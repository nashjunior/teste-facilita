import { Client } from '#clients/domain/entities';
import { ClientsRepository } from '#clients/domain/repository';
import Database from '#clients/infra/db/connection'; // Ajuste o caminho de importação conforme necessário
import { InvalidUUIDError, UniqueEntityId } from '#seedwork/domain';

export class ClientRepository implements ClientsRepository.Repository {
  async create(client: Client): Promise<void> {
    const query = `
      INSERT INTO clients (id, nome, endereco, email, telefone, deleted, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    const values = [
      client.uuid,
      client.nome,
      client.endereco,
      client.email,
      client.telefone,
      new Date(),
      null,
      client.deleted,
    ];
    await Database.getInstance().query(query, values);
  }

  async update(client: Client): Promise<void> {
    const query = `
    UPDATE table clients set( nome, endereco, email, telefone,  updated_at)
    VALUES ($2, $3, $4, $5, $8) WHERE id=$1
  `;
    const values = [
      client.uuid,
      client.nome,
      client.endereco,
      client.email,
      client.telefone,
      new Date(),
    ];
    await Database.getInstance().query(query, values);
  }

  async findById(id: UniqueEntityId | string): Promise<Client> {
    const query = `SELECT * from table clients  WHERE id=$1 and deleted=false`;
    const values = [typeof id === 'string' ? id : id.value];
    const response = await Database.getInstance().query(query, values);
    if (response.rows.length < 1) {
      throw new InvalidUUIDError();
    }
    const client = await Client.create(response.rows[0]);
    return client;
  }

  async delete(clientId: string): Promise<void> {
    const query = `
      UPDATE clients
      SET deleted = true, updated_at = $2
      WHERE id = $1
    `;
    const values = [clientId, new Date()];
    await Database.getInstance().query(query, values);
  }

  async find(filter: ClientsRepository.Filter): Promise<Client[]> {
    // ... implementação similar ao método create
  }

  // Outros métodos como findById, findAll, etc., podem ser adicionados conforme necessário
}
