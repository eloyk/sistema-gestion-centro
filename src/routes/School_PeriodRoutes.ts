import express, { Router } from "express";
import { School_PeriodController } from "../controllers/School_PeriodController";
import { requireAuth } from "../middlewares/requireAuth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

export default class School_PeriodRoutes {
    public router: Router;
    private controller: School_PeriodController = new School_PeriodController();
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get('/', requireAuth, this.controller.getAllSchool_Period);
        this.router.get('/:id', requireAuth, this.controller.getSchool_PeriodById);
        this.router.post('/', requireAuth, this.controller.createSchool_Period);
        this.router.put('/:id', requireAuth, this.controller.updateSchool_Period);
        this.router.delete('/:id', requireAuth, this.controller.deleteSchool_Period);
    }
}