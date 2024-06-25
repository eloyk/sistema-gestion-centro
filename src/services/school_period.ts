import { Pool, QueryResult } from 'pg';
import { School_PeriodModel, School_Period } from '../models/School_Period';
import pool from '../config/db';

export class School_PeriodService {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllSchool_Period(page: number, limit: number): Promise<School_Period[]> {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;
    try {
      const result: QueryResult = await client.query('SELECT * FROM School_Period ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
      return result.rows.map(row => new School_PeriodModel(row.id, row.description));
    } finally {
      client.release();
    }
  }

  async getSchool_PeriodById(id: number): Promise<School_Period | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query('SELECT * FROM School_Period WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        const { id, description } = result.rows[0];
        return new School_PeriodModel(id, description);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async createSchool_Period(description: string): Promise<School_Period> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'INSERT INTO School_Period (description) VALUES ($1) RETURNING *',
        [description]
      );
      const { id, description: school_PeriodDescription } = result.rows[0];
      return new School_PeriodModel(id, school_PeriodDescription);
    } finally {
      client.release();
    }
  }

  async updateSchool_Period(id: number, description: string): Promise<School_Period | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'UPDATE School_Period SET description = $2 WHERE id = $1 RETURNING *',
        [id, description]
      );
      if (result.rows.length > 0) {
        const { id, description } = result.rows[0];
        return new School_PeriodModel(id, description);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async deleteSchool_Period(id: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
        const result: QueryResult = await client.query('DELETE FROM School_Period WHERE id = $1', [id]);
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
