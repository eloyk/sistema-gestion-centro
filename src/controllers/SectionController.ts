import { Request, Response } from 'express';
import { SectionService } from '../services/section';

export class SectionController {
  private sectionService: SectionService;

  constructor() {
    this.sectionService = new SectionService();
  }

  public getAllSection = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const section = await this.sectionService.getAllSection(page, limit);
    res.json(section);
  };

  public getSectionById = async(req: Request, res: Response) => {
    const section = await this.sectionService.getSectionById(Number(req.params.id));
    if (section) {
      res.json(section);
    } else {
      res.status(404).send('section not found');
    }
  };

  public createSection = async (req: Request, res: Response) => {
    const { description } = req.body;
    const newSection = await this.sectionService.createSection(description );
    res.status(201).json(newSection);
  };

  public updateSection =  async (req: Request, res: Response) => {
    const { description } = req.body;
    const section = await this.sectionService.updateSection(Number(req.params.id), description);
    if (section) {
      res.json(section);
    } else {
      res.status(404).send('section not found');
    }
  };

  public deleteSection = async (req: Request, res: Response) => {
    try {
      const success = await this.sectionService.deleteSection(Number(req.params.id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send('section not found');
      }
    } catch (error) {
      console.error('Error deleting section:', error);
      res.status(500).send('Internal server error');
    }
  };
}
