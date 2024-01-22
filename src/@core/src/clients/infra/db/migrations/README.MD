
# README.md para Migrações de Banco de Dados - PostgreSQL

Este documento fornece instruções detalhadas sobre como utilizar as migrações de banco de dados para um sistema que utiliza PostgreSQL. As migrações incluídas são para a criação de tabelas `clients` e `clients_coordinates`.

## Pré-Requisitos

- PostgreSQL instalado e em execução.
- Permissões adequadas para criar bancos de dados e tabelas.
- Ferramenta de linha de comando ou interface gráfica para gerenciar o PostgreSQL (como psql ou pgAdmin).

## Configuração Inicial

### Criação do Banco de Dados

Antes de executar as migrações, você precisa criar um banco de dados no PostgreSQL. Substitua `nome_do_seu_banco` pelo nome de sua preferência:

```sql
CREATE DATABASE nome_do_seu_banco;
```

### Conexão ao Banco de Dados

Conecte-se ao banco de dados criado usando sua ferramenta de preferência.

## Migrações

As migrações são divididas em arquivos de 'Up' (para criar tabelas) e 'Down' (para remover tabelas).

### 1. Migração de Criação de Clientes

#### 001-Create-Clients-Up.sql

Este arquivo cria a tabela `clients`. Execute o seguinte comando SQL:

```sql
CREATE TABLE clients (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    deleted BOOLEAN
);
CREATE INDEX idx_nome_email_phone_number ON clients(name, email, phone_number);
CREATE INDEX idx_deleted ON clients USING hash (deleted);
```

#### 001-Create-Clients-Down.sql

Este arquivo remove a tabela `clients`. Execute o seguinte comando SQL se precisar desfazer a migração:

```sql
DROP TABLE IF EXISTS clients;
```

### 2. Migração de Criação de Coordenadas de Clientes

#### 002-CreateTabe-Clients-Corodenates-Up.sql

Este arquivo cria a tabela `clients_coordinates`. Execute o seguinte comando SQL:

```sql
CREATE TABLE clients_coordinates (
    id UUID PRIMARY KEY,
    client_id UUID NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    deleted BOOLEAN,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);
CREATE INDEX idx_client_id ON clients_coordinates USING hash (client_id);
```

#### 002-CreateTabe-Clients-Corodenates-Down.sql

Este arquivo remove a tabela `clients_coordinates`. Execute o seguinte comando SQL se precisar desfazer a migração:

```sql
DROP TABLE IF EXISTS clients_coordinates;
```

## Executando Migrações

- Para **aplicar** uma migração, execute o comando SQL fornecido no arquivo 'Up' correspondente.
- Para **reverter** uma migração, execute o comando SQL fornecido no arquivo 'Down' correspondente.

## Observações

- Certifique-se de ter backups dos seus dados antes de executar operações de migração, especialmente as de 'Down'.
- Teste as migrações em um ambiente de desenvolvimento antes de aplicá-las em um ambiente de produção.

---


