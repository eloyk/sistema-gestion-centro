import { Request, Response } from 'express';
import { Student_ListService } from '../services/student_list';

export class Student_ListController {
  private student_ListService: Student_ListService;

  constructor() {
    this.student_ListService = new Student_ListService();
  }

  public getAllStudent_List = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const student_List = await this.student_ListService.getAllStudent_List(page, limit);
    res.json(student_List);
  };

  public getStudent_ListById = async(req: Request, res: Response) => {
    const student_List = await this.student_ListService.getStudent_ListById(Number(req.params.id));
    if (student_List) {
      res.json(student_List);
    } else {
      res.status(404).send('student_List not found');
    }
  };

  public createStudent_List = async (req: Request, res: Response) => {
    const { id_student, id_course, id_school_period, id_school, order_num } = req.body;
    const newStudent_List = await this.student_ListService.createStudent_List(id_student, id_course, id_school_period, id_school, order_num);
    res.status(201).json(newStudent_List);
  };

  public updateStudent_List =  async (req: Request, res: Response) => {
    const { id_student, id_course, id_school_period, id_school, order_num } = req.body;
    const student_List = await this.student_ListService.updateStudent_List(Number(req.params.id), id_student, id_course, id_school_period, id_school, order_num);
    if (student_List) {
      res.json(student_List);
    } else {
      res.status(404).send('student_List not found');
    }
  };

  public deleteStudent_List = async (req: Request, res: Response) => {
    try {
      const success = await this.student_ListService.deleteStudent_List(Number(req.params.id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send('student_List not found');
      }
    } catch (error) {
      console.error('Error deleting student_List:', error);
      res.status(500).send('Internal server error');
    }
  };
}
