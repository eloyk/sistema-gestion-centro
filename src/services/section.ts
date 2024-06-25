import { Pool, QueryResult } from 'pg';
import { SectionModel, Section } from '../models/Section';
import pool from '../config/db';

export class SectionService {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllSection(page: number, limit: number): Promise<Section[]> {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;
    try {
      const result: QueryResult = await client.query('SELECT * FROM Section ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
      return result.rows.map(row => new SectionModel(row.id, row.description));
    } finally {
      client.release();
    }
  }

  async getSectionById(id: number): Promise<Section | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query('SELECT * FROM Section WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        const { id, description } = result.rows[0];
        return new SectionModel(id, description);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async createSection(description: string): Promise<Section> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'INSERT INTO Section (description) VALUES ($1) RETURNING *',
        [description]
      );
      const { id, description: sectionDescription } = result.rows[0];
      return new SectionModel(id, sectionDescription);
    } finally {
      client.release();
    }
  }

  async updateSection(id: number, description: string): Promise<Section | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'UPDATE Section SET description = $2 WHERE id = $1 RETURNING *',
        [id, description]
      );
      if (result.rows.length > 0) {
        const { id, description } = result.rows[0];
        return new SectionModel(id, description);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async deleteSection(id: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
        const result: QueryResult = await client.query('DELETE FROM Section WHERE id = $1', [id]);
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
