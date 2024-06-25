import express, { Router } from "express";
import { SchoolController } from "../controllers/SchoolController";
import { requireAuth } from "../middlewares/requireAuth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

export default class SchoolRoutes {
    public router: Router;
    private controller: SchoolController = new SchoolController();
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get('/', requireAuth, this.controller.getAllSchool);
        this.router.get('/:id', requireAuth, this.controller.getSchoolById);
        this.router.post('/', requireAuth, this.controller.createSchool);
        this.router.put('/:id', requireAuth, this.controller.updateSchool);
        this.router.delete('/:id', requireAuth, this.controller.deleteSchool);
    }
}