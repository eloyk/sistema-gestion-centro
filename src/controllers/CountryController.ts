import { Request, Response } from 'express';
import { CountryService } from '../services/country';

export class CountryController {
  private countryService: CountryService;

  constructor() {
    this.countryService = new CountryService();
  }

  public getAllCountry = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const country = await this.countryService.getAllCountry(page, limit);
    res.json(country);
  };

  public getCountryById = async(req: Request, res: Response) => {
    const country = await this.countryService.getCountryById(Number(req.params.id));
    if (country) {
      res.json(country);
    } else {
      res.status(404).send('country not found');
    }
  };

  public createCountry = async (req: Request, res: Response) => {
    const { description, nationality, literal, code } = req.body;
    const newCountry = await this.countryService.createCountry(description, nationality, literal, code);
    res.status(201).json(newCountry);
  };

  public updateCountry =  async (req: Request, res: Response) => {
    const { description, nationality, literal, code } = req.body;
    const country = await this.countryService.updateCountry(Number(req.params.id), description, nationality, literal, code);
    if (country) {
      res.json(country);
    } else {
      res.status(404).send('country not found');
    }
  };

  public deleteCountry = async (req: Request, res: Response) => {
    try {
      const success = await this.countryService.deleteCountry(Number(req.params.id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send('country not found');
      }
    } catch (error) {
      console.error('Error deleting country:', error);
      res.status(500).send('Internal server error');
    }
  };
}
