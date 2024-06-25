import express, { Router } from "express";
import { CourseController } from "../controllers/CourseController";
import { requireAuth } from "../middlewares/requireAuth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

export default class CourseRoutes {
    public router: Router;
    private controller: CourseController = new CourseController();
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get('/', requireAuth, this.controller.getAllCourse);
        this.router.get('/:id', requireAuth, this.controller.getCourseById);
        this.router.post('/', requireAuth, this.controller.createCourse);
        this.router.put('/:id', requireAuth, this.controller.updateCourse);
        this.router.delete('/:id', requireAuth, this.controller.deleteCourse);
    }
}