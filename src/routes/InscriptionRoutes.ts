import express, { Router } from "express";
import { InscriptionController } from "../controllers/InscriptionController";
import { requireAuth } from "../middlewares/requireAuth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

export default class InscriptionRoutes {
    public router: Router;
    private controller: InscriptionController = new InscriptionController();
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get('/', requireAuth, this.controller.getAllInscription);
        this.router.get('/:id', requireAuth, this.controller.getInscriptionById);
        this.router.post('/', requireAuth, this.controller.createInscription);
        this.router.put('/:id', requireAuth, this.controller.updateInscription);
        this.router.delete('/:id', requireAuth, this.controller.deleteInscription);
    }
}