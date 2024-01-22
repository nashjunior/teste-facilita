import { Entity } from '#seedwork/domain/entities';
import { IClientProps, Client } from '../client';

describe('Integration tests for client entity', () => {
  it('should inherit from entity base class', async () => {
    const clientEntity = await Client.create({
      name: 'Nome do Cliente',
      email: 'email@cliente.com',
      phoneNumber: '1234567891234',
    });

    expect(clientEntity).toBeInstanceOf(Entity);
  });

  describe('should validate on create', () => {
    it('should throw an error on invalid client on create', async () => {
      // Adicione casos de teste para verificar a validação em cenários inválidos
    });

    test('should return a valid entity on create', async () => {
      const props: IClientProps = {
        name: 'Nome Válido',
        email: 'email@valido.com',
        phoneNumber: '9876543211234',
      };

      const client = await Client.create(props);
      expect(client.toJSON()).toMatchObject(props);
    });
  });
});
