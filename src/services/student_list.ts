import { Pool, QueryResult } from 'pg';
import { Student_ListModel, Student_List } from '../models/Student_List';
import pool from '../config/db';

export class Student_ListService {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllStudent_List(page: number, limit: number): Promise<Student_List[]> {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;
    try {
      const result: QueryResult = await client.query('SELECT * FROM Student_List ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
      return result.rows.map(row => new Student_ListModel(row.id, row.id_student, row.id_course, row.id_school_period, row.id_school, row.order_num));
    } finally {
      client.release();
    }
  }

  async getStudent_ListById(id: number): Promise<Student_List | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query('SELECT * FROM Student_List WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        const { id, id_student, id_course, id_school_period, id_school, order_num } = result.rows[0];
        return new Student_ListModel(id, id_student, id_course, id_school_period, id_school, order_num);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async createStudent_List(id_student: number, id_course: number, id_school_period: number, id_school: number, order_num: number): Promise<Student_List> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'INSERT INTO Student_List (id_student, id_course, id_school_period, id_school, order_num) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id_student, id_course, id_school_period, id_school, order_num]
      );
      const { id, id_student: student_ListId_student, id_course: student_ListId_course, id_school_period: student_ListId_school_period, id_school: student_ListId_school, order_num: student_ListOrder_num } = result.rows[0];
      return new Student_ListModel(id, student_ListId_student, student_ListId_course, student_ListId_school_period, student_ListId_school, student_ListOrder_num);
    } finally {
      client.release();
    }
  }

  async updateStudent_List(id: number, id_student: number, id_course: number, id_school_period: number, id_school: number, order_num: number): Promise<Student_List | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'UPDATE Student_List SET id_student = $2, id_course = $3, id_school_period = $4, id_school = $5, order_num = $6 WHERE id = $1 RETURNING *',
        [id, id_student, id_course, id_school_period, id_school, order_num]
      );
      if (result.rows.length > 0) {
        const { id, id_student, id_course, id_school_period, id_school, order_num } = result.rows[0];
        return new Student_ListModel(id, id_student, id_course, id_school_period, id_school, order_num);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async deleteStudent_List(id: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
        const result: QueryResult = await client.query('DELETE FROM Student_List WHERE id = $1', [id]);
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
