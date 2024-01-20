CREATE TABLE clients (
    id UUID PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco TEXT NOT NULL,
    email VARCHAR(255) unique,
    telefone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    deleted BOOLEAN
);
CREATE INDEX idx_nome_email_telefone ON clientes USING (nome,email,telefone);
CREATE INDEX idx_deleted ON clientes USING hash (deleted);
