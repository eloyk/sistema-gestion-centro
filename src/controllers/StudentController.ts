import { Request, Response } from 'express';
import { StudentService } from '../services/student';

export class StudentController {
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  public getAllStudent = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const student = await this.studentService.getAllStudent(page, limit);
    res.json(student);
  };

  public getStudentById = async(req: Request, res: Response) => {
    const student = await this.studentService.getStudentById(Number(req.params.id));
    if (student) {
      res.json(student);
    } else {
      res.status(404).send('student not found');
    }
  };

  public createStudent = async (req: Request, res: Response) => {
    const { names, surnames, address, birth_date, id_gender, id_school } = req.body;
    const newStudent = await this.studentService.createStudent(names, surnames, address, birth_date, id_gender, id_school);
    res.status(201).json(newStudent);
  };

  public updateStudent =  async (req: Request, res: Response) => {
    const { names, surnames, address, birth_date, id_gender, id_school } = req.body;
    const student = await this.studentService.updateStudent(Number(req.params.id), names, surnames, address, birth_date, id_gender, id_school);
    if (student) {
      res.json(student);
    } else {
      res.status(404).send('student not found');
    }
  };

  public deleteStudent = async (req: Request, res: Response) => {
    try {
      const success = await this.studentService.deleteStudent(Number(req.params.id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send('student not found');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).send('Internal server error');
    }
  };
}
