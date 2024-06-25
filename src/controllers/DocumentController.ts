import { Request, Response } from 'express';
import { DocumentService } from '../services/document';

export class DocumentController {
  private documentService: DocumentService;

  constructor() {
    this.documentService = new DocumentService();
  }

  public getAllDocument = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const document = await this.documentService.getAllDocument(page, limit);
    res.json(document);
  };

  public getDocumentById = async(req: Request, res: Response) => {
    const document = await this.documentService.getDocumentById(Number(req.params.id));
    if (document) {
      res.json(document);
    } else {
      res.status(404).send('document not found');
    }
  };

  public createDocument = async (req: Request, res: Response) => {
    const { documentid_copy, photo_2x2, birth_certificate, doctor_certified, certified_record, id_student } = req.body;
    const newDocument = await this.documentService.createDocument(documentid_copy, photo_2x2, birth_certificate, doctor_certified, certified_record, id_student);
    res.status(201).json(newDocument);
  };

  public updateDocument =  async (req: Request, res: Response) => {
    const { documentid_copy, photo_2x2, birth_certificate, doctor_certified, certified_record, id_student } = req.body;
    const document = await this.documentService.updateDocument(Number(req.params.id), documentid_copy, photo_2x2, birth_certificate, doctor_certified, certified_record, id_student);
    if (document) {
      res.json(document);
    } else {
      res.status(404).send('document not found');
    }
  };

  public deleteDocument = async (req: Request, res: Response) => {
    try {
      const success = await this.documentService.deleteDocument(Number(req.params.id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send('document not found');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      res.status(500).send('Internal server error');
    }
  };
}
