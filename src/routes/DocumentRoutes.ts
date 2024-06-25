import express, { Router } from "express";
import { DocumentController } from "../controllers/DocumentController";
import { requireAuth } from "../middlewares/requireAuth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

export default class DocumentRoutes {
    public router: Router;
    private controller: DocumentController = new DocumentController();
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get('/', requireAuth, this.controller.getAllDocument);
        this.router.get('/:id', requireAuth, this.controller.getDocumentById);
        this.router.post('/', requireAuth, this.controller.createDocument);
        this.router.put('/:id', requireAuth, this.controller.updateDocument);
        this.router.delete('/:id', requireAuth, this.controller.deleteDocument);
    }
}