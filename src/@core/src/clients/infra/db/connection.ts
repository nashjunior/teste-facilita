import { Pool } from 'pg';
import environment from '../config';

export class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool(environment);
    this.pool.on('connect', () => {
      console.log('Conexão com o banco de dados estabelecida.');
    });
  }

  public static getInstance(): Database {
    console.log('Getting database instance...');

    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async query(text: string, params?: any[]) {
    return this.pool.query(text, params);
  }

  public async disconnect() {
    await this.pool.end();
    console.log('Conexão com o banco de dados encerrada.');
  }
}
