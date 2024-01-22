CREATE TABLE clients (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) unique,
    phone_number VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    deleted BOOLEAN
);
CREATE INDEX idx_nome_email_phone_number ON clients(name,email,phone_number);
CREATE INDEX idx_deleted ON clients USING hash (deleted);
