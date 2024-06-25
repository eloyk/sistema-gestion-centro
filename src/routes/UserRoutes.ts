import express, { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import UserController from "../controllers/UserController";

export default class UserRoutes {
    public router: Router;
    private controller: UserController = new UserController();

    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get('/currentUser', requireAuth, this.controller.currentUser);
        this.router.post('/login', this.controller.login);
        this.router.post('/logout', requireAuth, this.controller.logout);
    }
}