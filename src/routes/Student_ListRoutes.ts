import express, { Router } from "express";
import { Student_ListController } from "../controllers/Student_ListController";
import { requireAuth } from "../middlewares/requireAuth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

export default class Student_ListRoutes {
    public router: Router;
    private controller: Student_ListController = new Student_ListController();
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get('/', requireAuth, this.controller.getAllStudent_List);
        this.router.get('/:id', requireAuth, this.controller.getStudent_ListById);
        this.router.post('/', requireAuth, this.controller.createStudent_List);
        this.router.put('/:id', requireAuth, this.controller.updateStudent_List);
        this.router.delete('/:id', requireAuth, this.controller.deleteStudent_List);
    }
}