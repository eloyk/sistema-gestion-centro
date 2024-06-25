import { Pool, QueryResult } from 'pg';
import { GenderModel, Gender } from '../models/Gender';
import pool from '../config/db';

export class GenderService {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllGender(page: number, limit: number): Promise<Gender[]> {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;
    try {
      const result: QueryResult = await client.query('SELECT * FROM Gender ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
      return result.rows.map(row => new GenderModel(row.id, row.description, row.literal));
    } finally {
      client.release();
    }
  }

  async getGenderById(id: number): Promise<Gender | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query('SELECT * FROM Gender WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        const { id, description, literal } = result.rows[0];
        return new GenderModel(id, description, literal);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async createGender(description: string, literal: string): Promise<Gender> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'INSERT INTO Gender (description, literal) VALUES ($1, $2) RETURNING *',
        [description, literal]
      );
      const { id, description: genderDescription, literal: genderLiteral  } = result.rows[0];
      return new GenderModel(id, genderDescription, genderLiteral);
    } finally {
      client.release();
    }
  }

  async updateGender(id: number, description: string, literal: string): Promise<Gender | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'UPDATE Gender SET description = $2, literal = $3 WHERE id = $1 RETURNING *',
        [id, description, literal]
      );
      if (result.rows.length > 0) {
        const { id, description, literal } = result.rows[0];
        return new GenderModel(id, description, literal);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async deleteGender(id: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
        const result: QueryResult = await client.query('DELETE FROM Gender WHERE id = $1', [id]);
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
