import { Request, Response } from 'express';
import { DegreeService } from '../services/degree';

export class DegreeController {
  private degreeService: DegreeService;

  constructor() {
    this.degreeService = new DegreeService();
  }

  public getAllDegree = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const degree = await this.degreeService.getAllDegree(page, limit);
    res.json(degree);
  };

  public getDegreeById = async(req: Request, res: Response) => {
    const degree = await this.degreeService.getDegreeById(Number(req.params.id));
    if (degree) {
      res.json(degree);
    } else {
      res.status(404).send('degree not found');
    }
  };

  public createDegree = async (req: Request, res: Response) => {
    const { description, stage } = req.body;
    const newDegree = await this.degreeService.createDegree(description, stage );
    res.status(201).json(newDegree);
  };

  public updateDegree =  async (req: Request, res: Response) => {
    const { description, stage } = req.body;
    const degree = await this.degreeService.updateDegree(Number(req.params.id), description, stage);
    if (degree) {
      res.json(degree);
    } else {
      res.status(404).send('degree not found');
    }
  };

  public deleteDegree = async (req: Request, res: Response) => {
    try {
      const success = await this.degreeService.deleteDegree(Number(req.params.id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send('degree not found');
      }
    } catch (error) {
      console.error('Error deleting degree:', error);
      res.status(500).send('Internal server error');
    }
  };
}
