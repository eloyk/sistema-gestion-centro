import { Pool, QueryResult } from 'pg';
import { ModalityModel, Modality } from '../models/Modality';
import pool from '../config/db';

export class ModalityService {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllModality(page: number, limit: number): Promise<Modality[]> {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;
    try {
      const result: QueryResult = await client.query('SELECT * FROM Modality ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
      return result.rows.map(row => new ModalityModel(row.id, row.description, row.num_semester, row.is_ordenance, row.id_school));
    } finally {
      client.release();
    }
  }

  async getModalityById(id: number): Promise<Modality | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query('SELECT * FROM Modality WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        const { id, description, num_semester, is_ordenance, id_school } = result.rows[0];
        return new ModalityModel(id, description, num_semester, is_ordenance, id_school);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async createModality(description: string, num_semester: number, is_ordenance:boolean, id_school: number): Promise<Modality> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'INSERT INTO Modality (description, num_semester, is_ordenance, id_school) VALUES ($1, $2, $3, $4) RETURNING *',
        [description, num_semester, is_ordenance, id_school]
      );
      const { id, description: modalityDescription, num_semester: modalityNum_semester, is_ordenance: modalityIs_ordenance, id_school: modalityId_school  } = result.rows[0];
      return new ModalityModel(id, modalityDescription, modalityNum_semester, modalityIs_ordenance, modalityId_school);
    } finally {
      client.release();
    }
  }

  async updateModality(id: number, description: string, num_semester: number, is_ordenance:boolean): Promise<Modality | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'UPDATE Modality SET description = $2, num_semester = $3, is_ordenance = $4 WHERE id = $1 RETURNING *',
        [id, description, num_semester, is_ordenance]
      );
      if (result.rows.length > 0) {
        const { id, description, num_semester, is_ordenance, id_school } = result.rows[0];
        return new ModalityModel(id, description, num_semester, is_ordenance, id_school);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async deleteModality(id: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
        const result: QueryResult = await client.query('DELETE FROM Modality WHERE id = $1', [id]);
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
