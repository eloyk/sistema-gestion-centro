import { Pool, QueryResult } from 'pg';
import { DegreeModel, Degree } from '../models/Degree';
import pool from '../config/db';

export class DegreeService {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllDegree(page: number, limit: number): Promise<Degree[]> {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;
    try {
      const result: QueryResult = await client.query('SELECT * FROM Degree ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
      return result.rows.map(row => new DegreeModel(row.id, row.description, row.stage));
    } finally {
      client.release();
    }
  }

  async getDegreeById(id: number): Promise<Degree | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query('SELECT * FROM Degree WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        const { id, description, stage } = result.rows[0];
        return new DegreeModel(id, description, stage);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async createDegree(description: string, stage: string): Promise<Degree> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'INSERT INTO Degree (description, stage) VALUES ($1, $2) RETURNING *',
        [description, stage]
      );
      const { id, description: degreeDescription, stage: degreeStage } = result.rows[0];
      return new DegreeModel(id, degreeDescription, degreeStage);
    } finally {
      client.release();
    }
  }

  async updateDegree(id: number, description: string, stage: string): Promise<Degree | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'UPDATE Degree SET description = $2, stage = $3 WHERE id = $1 RETURNING *',
        [id, description, stage]
      );
      if (result.rows.length > 0) {
        const { id, description, stage } = result.rows[0];
        return new DegreeModel(id, description, stage);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async deleteDegree(id: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
        const result: QueryResult = await client.query('DELETE FROM Degree WHERE id = $1', [id]);
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
