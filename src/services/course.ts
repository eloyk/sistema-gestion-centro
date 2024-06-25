import { Pool, QueryResult } from 'pg';
import { CourseModel, Course } from '../models/Course';
import pool from '../config/db';

export class CourseService {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async getAllCourse(page: number, limit: number): Promise<Course[]> {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;
    try {
      const result: QueryResult = await client.query('SELECT * FROM Course ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
      return result.rows.map(row => new CourseModel(row.id, row.id_modality, row.id_section, row.id_degree, row.id_school_period, row.id_teacher, row.id_school, row.description, row.max_quantity));
    } finally {
      client.release();
    }
  }

  async getCourseById(id: number): Promise<Course | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query('SELECT * FROM Course WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        const { id, id_modality, id_section, id_degree, id_school_period, id_teacher, id_school, description, max_quantity } = result.rows[0];
        return new CourseModel(id, id_modality, id_section, id_degree, id_school_period, id_teacher, id_school, description, max_quantity);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async createCourse(id_modality: number, id_section: number, id_degree: number, id_school_period: number, id_teacher: number, id_school: number, description: string, max_quantity: number): Promise<Course> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'INSERT INTO Course (id_modality, id_section, id_degree, id_school_period, id_teacher, id_school, description, max_quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [id_modality, id_section, id_degree, id_school_period, id_teacher, id_school, description, max_quantity]
      );
      const { id, id_modality: courseId_modality, id_section: courseId_section, id_degree: courseId_degree, id_school_period: courseid_school_period, id_teacher: courseId_teacher, id_school: courseId_school, description: CourseDescription, max_quantity: CourseMax_quantity } = result.rows[0];
      return new CourseModel(id, courseId_modality, courseId_section, courseId_degree, courseid_school_period, courseId_teacher, courseId_school, CourseDescription, CourseMax_quantity);
    } finally {
      client.release();
    }
  }

  async updateCourse(id: number, id_modality: number, id_section: number, id_degree: number, id_school_period: number, id_teacher: number, id_school: number, description: string, max_quantity: number): Promise<Course | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(
        'UPDATE Course SET id_modality = $2, id_section = $3, id_degree = $4, id_school_period = $5, id_teacher = $6, id_school = $7, description = $8, max_quantity = $9 WHERE id = $1 RETURNING *',
        [id, id_modality, id_section, id_degree, id_school_period, id_teacher, id_school, description, max_quantity]
      );
      if (result.rows.length > 0) {
        const { id, id_modality, id_section, id_degree, id_school_period, id_teacher, id_school, description, max_quantity } = result.rows[0];
        return new CourseModel(id, id_modality, id_section, id_degree, id_school_period, id_teacher, id_school, description, max_quantity);
      }
      return null;
    } finally {
      client.release();
    }
  }

  async deleteCourse(id: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
        const result: QueryResult = await client.query('DELETE FROM Course WHERE id = $1', [id]);
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
