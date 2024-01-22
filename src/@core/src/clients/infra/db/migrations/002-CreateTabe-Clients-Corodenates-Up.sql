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

