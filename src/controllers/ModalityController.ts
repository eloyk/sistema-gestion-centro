// src/controllers/ModalityController.ts
import { Request, Response } from 'express';
import { ModalityService } from '../services/modality';

export class ModalityController {
  private modalityService: ModalityService;

  constructor() {
    this.modalityService = new ModalityService();
  }

  public getAllModality = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const modality = await this.modalityService.getAllModality(page, limit);
    res.json(modality);
  };

  public getModalityById = async(req: Request, res: Response) => {
    const modality = await this.modalityService.getModalityById(Number(req.params.id));
    if (modality) {
      res.json(modality);
    } else {
      res.status(404).send('Modality not found');
    }
  };

  public createModality = async (req: Request, res: Response) => {
    const { description, num_semester, is_ordenance, id_school } = req.body;
    const newModality = await this.modalityService.createModality(description, num_semester, is_ordenance, id_school);
    res.status(201).json(newModality);
  };

  public updateModality =  async (req: Request, res: Response) => {
    const { description, num_semester, is_ordenance, id_school} = req.body;
    const modality = await this.modalityService.updateModality(Number(req.params.id), description, num_semester, is_ordenance);
    if (modality) {
      res.json(modality);
    } else {
      res.status(404).send('Modality not found');
    }
  };

  public deleteModality = async (req: Request, res: Response) => {
    try {
      const success = await this.modalityService.deleteModality(Number(req.params.id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send('Modality not found');
      }
    } catch (error) {
      console.error('Error deleting Modality:', error);
      res.status(500).send('Internal server error');
    }
  };
}
