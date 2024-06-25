import express, { Router } from "express";
import { ModalityController } from "../controllers/ModalityController";
import { requireAuth } from "../middlewares/requireAuth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

export default class ModalityRoutes {
    public router: Router;
    private controller: ModalityController = new ModalityController();
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get('/', requireAuth, this.controller.getAllModality);
        this.router.get('/:id', requireAuth, this.controller.getModalityById);
        this.router.post('/', requireAuth, this.controller.createModality);
        this.router.put('/:id', requireAuth, this.controller.updateModality);
        this.router.delete('/:id', requireAuth, this.controller.deleteModality);
    }
}