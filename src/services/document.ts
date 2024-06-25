import { Pool, QueryResult } from 'pg';
import { DocumentModel, Document } from '../models/Document';
import pool from '../config/db';

export class DocumentService {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllDocument(page: number, limit: number): Promise<Document[]> {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;
    try {
      const result: QueryResult = await client.query('SELECT * FROM Document ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
      return result.rows.map(row => new DocumentModel(row.id, row.documentid_copy, row.photo_2x2, row.birth_certificate, row.doctor_certified, row.certified_record, row.id_student));
    } finally {
      client.release();
    }
  }

  async getDocumentById(id: number): Promise<Document | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query('SELECT * FROM Document WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        const { id, documentid_copy, photo_2x2, birth_certificate, doctor_certified, certified_record, id_student } = result.rows[0];
        return new DocumentModel(id, documentid_copy, photo_2x2, birth_certificate, doctor_certified, certified_record, id_student);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async createDocument(documentid_copy: boolean, photo_2x2: boolean, birth_certificate: boolean, doctor_certified: boolean, certified_record: boolean, id_student: number): Promise<Document> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'INSERT INTO Document (documentid_copy, photo_2x2, birth_certificate, doctor_certified, certified_record, id_student) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [documentid_copy, photo_2x2, birth_certificate, doctor_certified, certified_record, id_student]
      );
      const { id, documentid_copy: documentDocumentid_copy, photo_2x2: documentPhoto_2x2, birth_certificate: documentBirth_certificate, doctor_certified: documentDoctor_certified, certified_record: documentCertified_record, id_student: documentId_student  } = result.rows[0];
      return new DocumentModel(id, documentDocumentid_copy, documentPhoto_2x2, documentBirth_certificate, documentDoctor_certified, documentCertified_record, documentId_student);
    } finally {
      client.release();
    }
  }

  async updateDocument(id: number, documentid_copy: boolean, photo_2x2: boolean, birth_certificate: boolean, doctor_certified: boolean, certified_record: boolean, id_student: number): Promise<Document | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'UPDATE Document SET documentid_copy = $2, photo_2x2 = $3, birth_certificate = $4, doctor_certified = $5, certified_record = $6, id_student = $7 WHERE id = $1 RETURNING *',
        [id, documentid_copy, photo_2x2, birth_certificate, doctor_certified, certified_record, id_student]
      );
      if (result.rows.length > 0) {
        const { id, documentid_copy, photo_2x2, birth_certificate, doctor_certified, certified_record, id_student } = result.rows[0];
        return new DocumentModel(id, documentid_copy, photo_2x2, birth_certificate, doctor_certified, certified_record, id_student);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async deleteDocument(id: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
        const result: QueryResult = await client.query('DELETE FROM Document WHERE id = $1', [id]);
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
