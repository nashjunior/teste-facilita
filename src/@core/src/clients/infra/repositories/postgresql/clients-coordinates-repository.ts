import Database from '#clients/infra/db/connection';
import { ClientCoordinate } from '#clients/domain/entities/client-coordinates';
import { ClientsCoordinatesRepository } from '#clients/domain/repository';
import { InvalidUUIDError, UniqueEntityId } from '#seedwork/domain';

export class ClientCoordinatesRepository
  implements ClientsCoordinatesRepository.Repository
{
  search(
    props: ClientsCoordinatesRepository.SearchParams,
  ): Promise<ClientsCoordinatesRepository.SearchResult> {
    throw new Error('Method not implemented.');
  }
  createBatch(instance: ClientCoordinate[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | UniqueEntityId): Promise<void> {
    throw new Error('Method not implemented.');
  }
  find(): Promise<ClientCoordinate[]> {
    throw new Error('Method not implemented.');
  }
  findAndCount(): Promise<{ total: number; items: ClientCoordinate[] }> {
    throw new Error('Method not implemented.');
  }
  async create(clientCoordinate: ClientCoordinate): Promise<void> {
    const query = `
      INSERT INTO clients_coordinates (id, client_id, latitude, longitude)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [
      clientCoordinate.uuid,
      clientCoordinate.client.uuid,
      clientCoordinate.latitude,
      clientCoordinate.longitude,
    ];
    await Database.getInstance().query(query, values);
  }

  async update(clientCoordinate: ClientCoordinate): Promise<void> {
    const query = `
      UPDATE clients_coordinates
      SET latitude = $2, longitude = $3
      WHERE id = $1
    `;
    const values = [
      clientCoordinate.id.value,
      clientCoordinate.latitude,
      clientCoordinate.longitude,
    ];
    await Database.getInstance().query(query, values);
  }

  async findById(id: UniqueEntityId | string): Promise<ClientCoordinate> {
    const query = `SELECT * FROM clients_coordinates WHERE id = $1`;
    const values = [typeof id === 'string' ? id : id.value];
    const response = await Database.getInstance().query(query, values);
    if (response.rows.length === 0) {
      throw new InvalidUUIDError();
    }
    const row = response.rows[0];
    return ClientCoordinate.create(
      {
        latitude: row.latitude,
        longitude: row.longitude,
      },
      new UniqueEntityId(row.id),
    );
  }

  // Implemente outros métodos como delete, find, etc., conforme necessário
}
