import { Pool, QueryResult } from 'pg';
import { CountryModel, Country } from '../models/Country';
import pool from '../config/db';

export class CountryService {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllCountry(page: number, limit: number): Promise<Country[]> {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;
    try {
      const result: QueryResult = await client.query('SELECT * FROM Country ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
      return result.rows.map(row => new CountryModel(row.id, row.description, row.nationality, row.literal, row.code));
    } finally {
      client.release();
    }
  }

  async getCountryById(id: number): Promise<Country | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query('SELECT * FROM Country WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        const { id, description, nationality, literal, code } = result.rows[0];
        return new CountryModel(id, description, nationality, literal, code);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async createCountry(description: string, nationality: string, literal: string, code: number): Promise<Country> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'INSERT INTO Country (description, nationality, literal, code) VALUES ($1, $2, $3, $4) RETURNING *',
        [description, nationality, literal, code]
      );
      const { id, description: countryDescription, nationality: countryNationality, literal: countryLiteral, code: countryCode  } = result.rows[0];
      return new CountryModel(id, countryDescription, countryNationality, countryLiteral, countryCode);
    } finally {
      client.release();
    }
  }

  async updateCountry(id: number, description: string, nationality: string, literal: string, code: number): Promise<Country | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'UPDATE Country SET description = $2, nationality = $3, literal = $4, code = $5 WHERE id = $1 RETURNING *',
        [id, description, nationality, literal, code]
      );
      if (result.rows.length > 0) {
        const { id, description, nationality, literal, code } = result.rows[0];
        return new CountryModel(id, description, nationality, literal, code);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async deleteCountry(id: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
        const result: QueryResult = await client.query('DELETE FROM Country WHERE id = $1', [id]);
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
