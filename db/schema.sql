-- Use Enums for strict data integrity
CREATE TYPE ticket_status AS ENUM ('NEW', 'OPEN', 'PENDING', 'RESOLVED', 'CLOSED');
CREATE TYPE ticket_priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'END_USER', -- END_USER, AGENT, ADMIN
    department_id INT REFERENCES departments(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL -- e.g., 'Network', 'Hardware', 'SaaS'
);

CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status ticket_status DEFAULT 'NEW',
    priority ticket_priority DEFAULT 'LOW',
    reporter_id UUID REFERENCES users(id) NOT NULL,
    assignee_id UUID REFERENCES users(id), -- Nullable until assigned
    category_id INT REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
    author_id UUID REFERENCES users(id),
    body TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT FALSE, -- Agents only see this if True
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);