import { Pool, QueryResult } from 'pg';
import { TeacherModel, Teacher } from '../models/Teacher';
import pool from '../config/db';

export class TeacherService {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllTeacher(page: number, limit: number): Promise<Teacher[]> {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;
    try {
      const result: QueryResult = await client.query('SELECT * FROM Teacher ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
      return result.rows.map(row => new TeacherModel(row.id, row.names, row.surnames, row.address, row.birth_date, row.specialization, row.position, row.id_gender, row.id_school));
    } finally {
      client.release();
    }
  }

  async getTeacherById(id: number): Promise<Teacher | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query('SELECT * FROM Teacher WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        const { id, names, surnames, address, birth_date, specialization, position, id_gender, id_school } = result.rows[0];
        return new TeacherModel(id, names, surnames, address, birth_date, specialization, position, id_gender, id_school);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async createTeacher(names: string, surnames: string, address: string, birth_date: Date, specialization: string, position: string, id_gender: number, id_school: number): Promise<Teacher> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'INSERT INTO Teacher (names, surnames, address, birth_date, specialization, position, id_gender, id_school) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [names, surnames, address, birth_date, specialization, position, id_gender, id_school]
      );
      const { id, names: teacherNames, surnames: teacherSurnames, address: teacherAddress, birth_date: teacherBirth_date, specialization: teacherSpecialization, position: teacherPosition, id_gender: teacherId_gender, id_school: teacherId_school } = result.rows[0];
      return new TeacherModel(id, teacherNames, teacherSurnames, teacherAddress, teacherBirth_date, teacherSpecialization, teacherPosition, teacherId_gender, teacherId_school);
    } finally {
      client.release();
    }
  }

  async updateTeacher(id: number, names: string, surnames: string, address: string, birth_date: Date, speciatization: string, position: string, id_gender: number, id_school: number): Promise<Teacher | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'UPDATE Teacher SET names = $2, surnames = $3, address = $4, birth_date = $5, speciatization = $6, position = $7, id_gender = $8, id_school = $9 WHERE id = $1 RETURNING *',
        [id, names, surnames, address, birth_date, speciatization, position, id_gender, id_school]
      );
      if (result.rows.length > 0) {
        const { id, names, surnames, address, birth_date, speciatization, position, id_gender, id_school } = result.rows[0];
        return new TeacherModel(id, names, surnames, address, birth_date, speciatization, position, id_gender, id_school);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async deleteTeacher(id: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
        const result: QueryResult = await client.query('DELETE FROM Teacher WHERE id = $1', [id]);
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
