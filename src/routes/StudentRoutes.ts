import express, { Router } from "express";
import { StudentController } from "../controllers/StudentController";
import { requireAuth } from "../middlewares/requireAuth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

export default class StudentRoutes {
    public router: Router;
    private controller: StudentController = new StudentController();
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get('/', requireAuth, this.controller.getAllStudent);
        this.router.get('/:id', requireAuth, this.controller.getStudentById);
        this.router.post('/', requireAuth, this.controller.createStudent);
        this.router.put('/:id', requireAuth, this.controller.updateStudent);
        this.router.delete('/:id', requireAuth, this.controller.deleteStudent);
    }
}