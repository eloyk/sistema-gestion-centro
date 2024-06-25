import express, { Router } from "express";
import { SectionController } from "../controllers/SectionController";
import { requireAuth } from "../middlewares/requireAuth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

export default class SectionRoutes {
    public router: Router;
    private controller: SectionController = new SectionController();
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get('/', requireAuth, this.controller.getAllSection);
        this.router.get('/:id', requireAuth, this.controller.getSectionById);
        this.router.post('/', requireAuth, this.controller.createSection);
        this.router.put('/:id', requireAuth, this.controller.updateSection);
        this.router.delete('/:id', requireAuth, this.controller.deleteSection);
    }
}