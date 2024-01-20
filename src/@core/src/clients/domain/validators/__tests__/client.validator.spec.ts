import { Client, IClientProps } from '#clients/domain/entities';
import { IValidatorFields } from '#seedwork/domain/validators';
import { ClientValidator } from '../client.validator'; // Ajuste o import conforme necessário

describe('Client validator tests', () => {
  let clientValidator: IValidatorFields<IClientProps>;

  beforeEach(() => {
    clientValidator = new ClientValidator();
  });

  it('invalidation cases for nome', async () => {
    // Adicione aqui os testes para a propriedade 'nome'
  });

  it('invalidation cases for endereco', async () => {
    // Adicione aqui os testes para a propriedade 'endereco'
  });

  // Repita para outras propriedades como 'email', 'telefone', 'deleted'

  it('should validate with all fields correctly', async () => {
    const validateData: IClientProps = {
      // Adicione os valores corretos
    };
    // Teste se o validador retorna verdadeiro e se os dados validados correspondem
  });
});
