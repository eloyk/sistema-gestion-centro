import { Request, Response } from 'express';
import { SchoolService } from '../services/school';

export class SchoolController {
  private schoolService: SchoolService;

  constructor() {
    this.schoolService = new SchoolService();
  }

  public getAllSchool = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const school = await this.schoolService.getAllSchool(page, limit);
    res.json(school);
  };

  public getSchoolById = async(req: Request, res: Response) => {
    const school = await this.schoolService.getSchoolById(Number(req.params.id));
    if (school) {
      res.json(school);
    } else {
      res.status(404).send('school not found');
    }
  };

  public createSchool = async (req: Request, res: Response) => {
    const { name, address, code, director, keycloak_client_id } = req.body;
    const newSchool = await this.schoolService.createSchool(name, address, code, director);
    res.status(201).json(newSchool);
  };

  public updateSchool =  async (req: Request, res: Response) => {
    const { name, address, code, director, keycloak_client_id } = req.body;
    const school = await this.schoolService.updateSchool(Number(req.params.id), name, address, code, director);
    if (school) {
      res.json(school);
    } else {
      res.status(404).send('school not found');
    }
  };

  public deleteSchool = async (req: Request, res: Response) => {
    try {
      const success = await this.schoolService.deleteSchool(Number(req.params.id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send('school not found');
      }
    } catch (error) {
      console.error('Error deleting school:', error);
      res.status(500).send('Internal server error');
    }
  };
}
