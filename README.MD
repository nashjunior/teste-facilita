# Teste Vaga Facilita

## This project is currently

### under construction, and here's a brief overview

## Project Overview

### A company that cleans homes faces challenges in managing its customers and is looking for an efficient solution to register and visualize information that is currently controlled in spreadsheets. To centralize information and help the company expand, it wants a platform where it can manage its customers. The system must consist of a backend in Node.js using PostgreSQL as the database, and a frontend in React.

## Relates To

- [Frontend](https://github.com/nashjunior/teste-facilita-front)

## Technologies used:

- NodeJS --- Fastify.
- TypeORM
- Yup
- UUID
- JEST --- UNITARY AND INTEGRATION TESTING
- POSTGRES

### Command to run Backend

1. git checkout develop

2. Run the [migrations](src/@core/src/clients/infra/db/migrations/README.MD)

3. Install the packages
    - npm
      ```bash
      npm i
      ```
    - yarn
      ```bash
      yarn
      ```
4. Set your .env like
  ```javascript
  DB_USER=postgres
  DB_HOST=<your ip>
  DB_NAME=<your host>
  DB_PASSWORD=<your password>
  DB_PORT=5432
  PORT=<your port (default - 4000)>
  ```
5. Build the project
    - npm
      ```bash
      npm run build
      ```
    - yarn
      ```bash
      yarn build
      ```
6. Run the project
    - npm
      ```bash
      npm run start
      ```
    - yarn
      ```bash
      yarn start
      ```
## Approach

This api is constructed using a mono repo.
See the api in
```bash
http://<your-ip>:<port>/documentation
```


### Folder structure

```bash
├── src
│ ├── @core
│ │ ├── src
│ │ │ ├── @seedwork
│ │ │ ├──── entities
│ │ │ ├──── errors
│ │ │ ├──── repositories
│ │ │ ├──── validators
│ │ │ └──── value-objects
│ │ │ ├──── clients
│ │ │ │ ├──── application
│ │ │ │ │  ├──── dto
│ │ │ │ │  ├──── usecases
│ │ │ │ ├──── domain
│ │ │ │ │  ├──── entities
│ │ │ │ │  ├──── errors
│ │ │ │ │  ├──── validators
│ │ │ │ │  ├──── repositories
│ │ │ │ ├──── infra
│ │ │ │ │  ├──── config
│ │ │ │ │  ├──── db
│ │ │ │ │  │  ├──── migrations
│ │ │ │ │  ├──── repositories
│ │ │ │ │  │  ├──── inmemory
│ │ │ │ │  │  ├──── postgresql
│ │ │ ├── infra
│ ├── infra
│ │ ├── http
│ │ │ ├── controllers
│ │ │ ├── middleware
│ │ │ ├── routes
│ ├── app.ts
│ ├── server.ts
```

@core - Repository where system is located
  - @seedwork - This folder represents the base code that will be used in the api
    - entities - a abstract class entity using generics
    - errors - base application errors
    - validators - folder where all adapter classes like Yup will be located.
        All adapters should implement same interface IValidator
    - value-objects - Folder where stores base value objects classes.
  - clients -
    This folder represents the actual implementation of the project
    - application - Where application-specific logic resides
      - dto - where the usecase outputs are stored.
      - usecase - represents each usecase of the sistem
    - domain -
      This folder represents system core.
      - entities - all entities used in the system
      - errors - all errors used in the domain
      - validators - all entities field validations
      - repositories - all repositories interfaces used by the infra
    - infra -
      The Infrastructure layer is responsible for dealing with external concerns such as databases, frameworks, and external services.
      - config
        application configuration like environment
      - db
        where it stores database connection
      - repositories
        where the actual repositories implementation runs
        - inmemory
        Repository in memory (only for tests)
        - postgresql
        Repository where Postgres DQL resides

infra - Where the api resides

app.ts - where the instance of fastify is created

server.ts - where the server runs

