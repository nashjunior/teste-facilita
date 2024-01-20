export type IClientOutput = {
  id: string;
  nome: string;
  endereco: string;
  email: string;
  telefone: string;
  createdAt: Date;
  updatedAt: Date | null;
  deleted: boolean;
};
