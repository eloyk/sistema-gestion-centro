import { Request, Response } from 'express';
import { CourseService } from '../services/course';

export class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  public getAllCourse = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const course = await this.courseService.getAllCourse(page, limit);
    res.json(course);
  };

  public getCourseById = async(req: Request, res: Response) => {
    const course = await this.courseService.getCourseById(Number(req.params.id));
    if (course) {
      res.json(course);
    } else {
      res.status(404).send('course not found');
    }
  };

  public createCourse = async (req: Request, res: Response) => {
    const { id_modality, id_section, id_degree, id_school_period, id_teacher, id_school, description, max_quantity } = req.body;
    const newCourse = await this.courseService.createCourse(id_modality, id_section, id_degree, id_school_period, id_teacher, id_school, description, max_quantity);
    res.status(201).json(newCourse);
  };

  public updateCourse =  async (req: Request, res: Response) => {
    const { id_modality, id_section, id_degree, id_school_period, id_teacher, id_school, description, max_quantity } = req.body;
    const course = await this.courseService.updateCourse(Number(req.params.id), id_modality, id_section, id_degree, id_school_period, id_teacher, id_school, description, max_quantity);
    if (course) {
      res.json(course);
    } else {
      res.status(404).send('course not found');
    }
  };

  public deleteCourse = async (req: Request, res: Response) => {
    try {
      const success = await this.courseService.deleteCourse(Number(req.params.id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send('course not found');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).send('Internal server error');
    }
  };
}
