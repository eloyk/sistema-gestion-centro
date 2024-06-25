import { Request, Response } from 'express';
import { TeacherService } from '../services/teacher';

export class TeacherController {
  private teacherService: TeacherService;

  constructor() {
    this.teacherService = new TeacherService();
  }

  public getAllTeacher = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const teacher = await this.teacherService.getAllTeacher(page, limit);
    res.json(teacher);
  };

  public getTeacherById = async(req: Request, res: Response) => {
    const teacher = await this.teacherService.getTeacherById(Number(req.params.id));
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).send('teacher not found');
    }
  };

  public createTeacher = async (req: Request, res: Response) => {
    const { names, surnames, address, birth_date, specialization, position, id_gender, id_school } = req.body;
    const newTeacher = await this.teacherService.createTeacher(names, surnames, address, birth_date, specialization, position, id_gender, id_school);
    res.status(201).json(newTeacher);
  };

  public updateTeacher =  async (req: Request, res: Response) => {
    const { names, surnames, address, birth_date, specialization, position, id_gender, id_school } = req.body;
    const teacher = await this.teacherService.updateTeacher(Number(req.params.id), names, surnames, address, birth_date, specialization, position, id_gender, id_school);
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).send('teacher not found');
    }
  };

  public deleteTeacher = async (req: Request, res: Response) => {
    try {
      const success = await this.teacherService.deleteTeacher(Number(req.params.id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send('teacher not found');
      }
    } catch (error) {
      console.error('Error deleting teacher:', error);
      res.status(500).send('Internal server error');
    }
  };
}
