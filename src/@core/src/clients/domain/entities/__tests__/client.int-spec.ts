import { Entity } from '#seedwork/domain/entities';
import { IClientProps, Client } from '../client';
import { EntityValidationError } from '#seedwork/domain/errors';

describe('Integration tests for client entity', () => {
  it('should inherit from entity base class', async () => {
    const clientEntity = await Client.create({
      nome: 'Nome do Cliente',
      endereco: 'Endereço do Cliente',
      email: 'email@cliente.com',
      telefone: '123456789',
      deleted: false,
    });

    expect(clientEntity).toBeInstanceOf(Entity);
  });

  describe('should validate on create', () => {
    it('should throw an error on invalid client on create', async () => {
      // Adicione casos de teste para verificar a validação em cenários inválidos
    });

    test('should return a valid entity on create', async () => {
      const props: IClientProps = {
        nome: 'Nome Válido',
        endereco: 'Endereço Válido',
        email: 'email@valido.com',
        telefone: '987654321',
        deleted: false,
      };

      const client = await Client.create(props);
      expect(client.toJSON()).toMatchObject({
        nome: 'Nome Válido',
        endereco: 'Endereço Válido',
        email: 'email@valido.com',
        telefone: '987654321',
        deleted: false,
      });
    });
  });

  describe('should validate on update', () => {
    it('should throw an error on invalid client on update', async () => {
      // Adicione casos de teste para verificar a validação em cenários inválidos durante a atualização
    });

    it('should return a valid client', async () => {
      // Adicione casos de teste para verificar se a entidade é válida após a atualização
    });
  });
});
