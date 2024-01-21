import { Client, ClientCoordinate } from '#clients/domain';
import { C, ClientsCoordinatesInMemoryRepository } from '#clients/infra';
import { Usecase } from '../generate-routes';

describe('Test suit to visit all coordinates', () => {
  let usecase: Usecase;
  let repo: ClientsCoordinatesInMemoryRepository;

  beforeEach(() => {
    repo = new ClientsCoordinatesInMemoryRepository();
    usecase = new Usecase(repo);
  });
  test('should find the most optimal way to visit the clients', async () => {
    const clientsCoordinates: ClientCoordinate[] = [];

    for (let index = 0; index < 10; index++) {
      const client = await Client.create({
        name: `name${index + 1}`,
        email: `email${index + 1}@mail.com`,
        phoneNumber: (index + 1).toString().repeat(index + 1),
      });

      clientsCoordinates.push(
        await ClientCoordinate.create(client, {
          latitude: (Math.random() * 90 + 10).toFixed(2),
          longitude: (Math.random() * 90 + 10).toFixed(2),
        }),
      );
    }

    await repo.createBatch(clientsCoordinates);

    const respose = await usecase.execute();

    console.log(respose);
  });
});
