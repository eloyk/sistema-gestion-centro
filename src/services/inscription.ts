import { Pool, QueryResult } from 'pg';
import { InscriptionModel, Inscription } from '../models/Inscription';
import pool from '../config/db';

export class InscriptionService {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllInscription(page: number, limit: number): Promise<Inscription[]> {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;
    try {
      const result: QueryResult = await client.query('SELECT * FROM Inscription ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
      return result.rows.map(row => new InscriptionModel(row.id, row.id_school, row.id_document, row.id_student));
    } finally {
      client.release();
    }
  }

  async getInscriptionById(id: number): Promise<Inscription | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query('SELECT * FROM Inscription WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        const { id, id_school, id_document, id_student } = result.rows[0];
        return new InscriptionModel(id, id_school, id_document, id_student);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async createInscription(id_school: number, id_document: number, id_student: number): Promise<Inscription> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'INSERT INTO Inscription (id_school, id_document, id_student) VALUES ($1, $2, $3) RETURNING *',
        [id_school, id_document, id_student]
      );
      const { id, id_school: inscriptionId_school, id_document: inscriptionId_document, id_student: InscriptionId_student } = result.rows[0];
      return new InscriptionModel(id, inscriptionId_school, inscriptionId_document, InscriptionId_student);
    } finally {
      client.release();
    }
  }

  async updateInscription(id: number, id_school: number, id_document: number, id_student: number): Promise<Inscription | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'UPDATE Inscription SET id_school = $2, id_document = $3, id_student = $4 WHERE id = $1 RETURNING *',
        [id, id_school, id_document, id_student]
      );
      if (result.rows.length > 0) {
        const { id, id_school, id_document, id_student } = result.rows[0];
        return new InscriptionModel(id, id_school, id_document, id_student);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async deleteInscription(id: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
        const result: QueryResult = await client.query('DELETE FROM Inscription WHERE id = $1', [id]);
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
