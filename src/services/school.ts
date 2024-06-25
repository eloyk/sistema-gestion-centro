import { Pool, QueryResult } from 'pg';
import { SchoolModel, School } from '../models/School';
import pool from '../config/db';

export class SchoolService {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllSchool(page: number, limit: number): Promise<School[]> {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;
    try {
      const result: QueryResult = await client.query('SELECT * FROM School ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
      return result.rows.map(row => new SchoolModel(row.id, row.name, row.address, row.code, row.director));
    } finally {
      client.release();
    }
  }

  async getSchoolById(id: number): Promise<School | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query('SELECT * FROM School WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        const { id, name, address, code, director } = result.rows[0];
        return new SchoolModel(id, name, address, code, director);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async getSchoolByClientId(keycloak_client_id: string): Promise<School | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query('SELECT * FROM School WHERE code = $1', [keycloak_client_id]);
      if (result.rows.length > 0) {
        const { id, name, address, code, director } = result.rows[0];
        return new SchoolModel(id, name, address, code, director);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async createSchool(name: string, address: string, code: string, director: string): Promise<School> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'INSERT INTO School (name, address, code, director) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, address, code, director]
      );
      const { id, name: schoolName, address: schoolAddress, code: schoolCode, director: schoolDirector } = result.rows[0];
      return new SchoolModel(id, schoolName, schoolAddress, schoolCode, schoolDirector);
    } finally {
      client.release();
    }
  }

  async updateSchool(id: number, name: string, address: string, code: string, director: string): Promise<School | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'UPDATE School SET name = $2, address = $3, code = $4, director = $5, WHERE id = $1 RETURNING *',
        [id, name, address, code, director]
      );
      if (result.rows.length > 0) {
        const { id, name, address, code, director } = result.rows[0];
        return new SchoolModel(id, name, address, code, director);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async deleteSchool(id: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
        const result: QueryResult = await client.query('DELETE FROM School WHERE id = $1', [id]);
        if (result.rowCount !== null) {
            return result.rowCount > 0;
        } else {
            console.warn('No se pudo determinar el número de filas afectadas.');
            return false;
        }
    } finally {
      client.release();
    }
  }
}
