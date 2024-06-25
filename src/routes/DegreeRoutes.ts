import express, { Router } from "express";
import { DegreeController } from "../controllers/DegreeController";
import { requireAuth } from "../middlewares/requireAuth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

export default class DegreeRoutes {
    public router: Router;
    private controller: DegreeController = new DegreeController();
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get('/', requireAuth, this.controller.getAllDegree);
        this.router.get('/:id', requireAuth, this.controller.getDegreeById);
        this.router.post('/', requireAuth, this.controller.createDegree);
        this.router.put('/:id', requireAuth, this.controller.updateDegree);
        this.router.delete('/:id', requireAuth, this.controller.deleteDegree);
    }
}