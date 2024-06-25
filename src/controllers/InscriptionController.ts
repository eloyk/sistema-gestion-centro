// src/controllers/inscriptionController.ts
import { Request, Response } from 'express';
import { InscriptionService } from '../services/inscription';

export class InscriptionController {
  private inscriptionService: InscriptionService;

  constructor() {
    this.inscriptionService = new InscriptionService();
  }

  public getAllInscription = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const inscription = await this.inscriptionService.getAllInscription(page, limit);
    res.json(inscription);
  };

  public getInscriptionById = async(req: Request, res: Response) => {
    const inscription = await this.inscriptionService.getInscriptionById(Number(req.params.id));
    if (inscription) {
      res.json(inscription);
    } else {
      res.status(404).send('inscription not found');
    }
  };

  public createInscription = async (req: Request, res: Response) => {
    const { id_school, id_document, id_student } = req.body;
    const newInscription = await this.inscriptionService.createInscription(id_school, id_document, id_student);
    res.status(201).json(newInscription);
  };

  public updateInscription =  async (req: Request, res: Response) => {
    const { id_school, id_document, id_student } = req.body;
    const inscription = await this.inscriptionService.updateInscription(Number(req.params.id), id_school, id_document, id_student);
    if (inscription) {
      res.json(inscription);
    } else {
      res.status(404).send('inscription not found');
    }
  };

  public deleteInscription = async (req: Request, res: Response) => {
    try {
      const success = await this.inscriptionService.deleteInscription(Number(req.params.id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send('inscription not found');
      }
    } catch (error) {
      console.error('Error deleting inscription:', error);
      res.status(500).send('Internal server error');
    }
  };
}
