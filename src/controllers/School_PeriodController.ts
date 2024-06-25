import { Request, Response } from 'express';
import { School_PeriodService } from '../services/school_period';

export class School_PeriodController {
  private school_PeriodService: School_PeriodService;

  constructor() {
    this.school_PeriodService = new School_PeriodService();
  }

  public getAllSchool_Period = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const school_Period = await this.school_PeriodService.getAllSchool_Period(page, limit);
    res.json(school_Period);
  };

  public getSchool_PeriodById = async(req: Request, res: Response) => {
    const school_Period = await this.school_PeriodService.getSchool_PeriodById(Number(req.params.id));
    if (school_Period) {
      res.json(school_Period);
    } else {
      res.status(404).send('school_Period not found');
    }
  };

  public createSchool_Period = async (req: Request, res: Response) => {
    const { description } = req.body;
    const newschool_Period = await this.school_PeriodService.createSchool_Period(description );
    res.status(201).json(newschool_Period);
  };

  public updateSchool_Period =  async (req: Request, res: Response) => {
    const { description } = req.body;
    const school_Period = await this.school_PeriodService.updateSchool_Period(Number(req.params.id), description);
    if (school_Period) {
      res.json(school_Period);
    } else {
      res.status(404).send('school_Period not found');
    }
  };

  public deleteSchool_Period = async (req: Request, res: Response) => {
    try {
      const success = await this.school_PeriodService.deleteSchool_Period(Number(req.params.id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send('school_Period not found');
      }
    } catch (error) {
      console.error('Error deleting school_Period:', error);
      res.status(500).send('Internal server error');
    }
  };
}
