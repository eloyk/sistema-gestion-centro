import { Pool, QueryResult } from 'pg';
import { StudentModel, Student } from '../models/Student';
import pool from '../config/db';

export class StudentService {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllStudent(page: number, limit: number): Promise<Student[]> {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;
    try {
      const result: QueryResult = await client.query('SELECT * FROM Student ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
      return result.rows.map(row => new StudentModel(row.id, row.names, row.surnames, row.address, row.birth_date, row.id_gender, row.id_school));
    } finally {
      client.release();
    }
  }

  async getStudentById(id: number): Promise<Student | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query('SELECT * FROM Student WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        const { id, names, surnames, address, birth_date, id_gender, id_school } = result.rows[0];
        return new StudentModel(id, names, surnames, address, birth_date, id_gender, id_school);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async createStudent(names: string, surnames: string, address: string, birth_date: Date, id_gender: number, id_school: number): Promise<Student> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'INSERT INTO Student (names, surnames, address, birth_date, id_gender, id_school) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [names, surnames, address, birth_date, id_gender, id_school]
      );
      const { id, names: studentnames, surnames: studentsurnames, address: studentAddress, birth_date: studentBirth_date, id_gender: studentId_gender, id_school: studentId_school  } = result.rows[0];
      return new StudentModel(id, studentnames, studentsurnames, studentAddress, studentBirth_date, studentId_gender, studentId_school);
    } finally {
      client.release();
    }
  }

  async updateStudent(id: number, names: string, surnames: string, address: string, birth_date: Date, id_gender: number, id_school: number): Promise<Student | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'UPDATE Student SET names = $2, surnames = $3, address = $4, birth_date = $5, id_gender = $6, id_school = $7 WHERE id = $1 RETURNING *',
        [id, names, surnames, address, birth_date, id_gender, id_school]
      );
      if (result.rows.length > 0) {
        const { id, names, surnames, address, birth_date, id_gender, id_school } = result.rows[0];
        return new StudentModel(id, names, surnames, address, birth_date, id_gender, id_school);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async deleteStudent(id: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
        const result: QueryResult = await client.query('DELETE FROM Student WHERE id = $1', [id]);
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
