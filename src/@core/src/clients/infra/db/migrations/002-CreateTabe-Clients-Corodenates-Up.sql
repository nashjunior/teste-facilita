CREATE TABLE clients_coordinates (
    id UUID PRIMARY KEY,
    client_id UUID NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clientes(id)
);
CREATE INDEX idx_client_id ON client_id USING hash (client_id);

