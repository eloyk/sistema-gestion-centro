import express, { Router } from "express";
import { GenderController } from "../controllers/GenderController";
import { requireAuth } from "../middlewares/requireAuth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

export default class GenderRoutes {
    public router: Router;
    private controller: GenderController = new GenderController();
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get('/', requireAuth, this.controller.getAllGender);
        this.router.get('/:id', requireAuth, this.controller.getGenderById);
        this.router.post('/', requireAuth, this.controller.createGender);
        this.router.put('/:id', requireAuth, this.controller.updateGender);
        this.router.delete('/:id', requireAuth, this.controller.deleteGender);
    }
}