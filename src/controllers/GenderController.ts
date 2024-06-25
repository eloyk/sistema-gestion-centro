import { Request, Response } from 'express';
import { GenderService } from '../services/gender';

export class GenderController {
  private genderService: GenderService;

  constructor() {
    this.genderService = new GenderService();
  }

  public getAllGender = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const gender = await this.genderService.getAllGender(page, limit);
    res.json(gender);
  };

  public getGenderById = async(req: Request, res: Response) => {
    const gender = await this.genderService.getGenderById(Number(req.params.id));
    if (gender) {
      res.json(gender);
    } else {
      res.status(404).send('gender not found');
    }
  };

  public createGender = async (req: Request, res: Response) => {
    const { description, literal } = req.body;
    const newGender = await this.genderService.createGender(description, literal );
    res.status(201).json(newGender);
  };

  public updateGender =  async (req: Request, res: Response) => {
    const { description, literal } = req.body;
    const gender = await this.genderService.updateGender(Number(req.params.id), description, literal);
    if (gender) {
      res.json(gender);
    } else {
      res.status(404).send('gender not found');
    }
  };

  public deleteGender = async (req: Request, res: Response) => {
    try {
      const success = await this.genderService.deleteGender(Number(req.params.id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send('gender not found');
      }
    } catch (error) {
      console.error('Error deleting gender:', error);
      res.status(500).send('Internal server error');
    }
  };
}
