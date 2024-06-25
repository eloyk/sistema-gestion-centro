import express, { Router } from "express";
import { TeacherController } from "../controllers/TeacherController";
import { requireAuth } from "../middlewares/requireAuth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

export default class TeacherRoutes {
    public router: Router;
    private controller: TeacherController = new TeacherController();
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get('/', requireAuth, this.controller.getAllTeacher);
        this.router.get('/:id', requireAuth, this.controller.getTeacherById);
        this.router.post('/', requireAuth, this.controller.createTeacher);
        this.router.put('/:id', requireAuth, this.controller.updateTeacher);
        this.router.delete('/:id', requireAuth, this.controller.deleteTeacher);
    }
}