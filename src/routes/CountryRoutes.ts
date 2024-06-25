import express, { Router } from "express";
import { CountryController } from "../controllers/CountryController";
import { requireAuth } from "../middlewares/requireAuth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

export default class CountryRoutes {
    public router: Router;
    private controller: CountryController = new CountryController();
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get('/', requireAuth, this.controller.getAllCountry);
        this.router.get('/:id', requireAuth, this.controller.getCountryById);
        this.router.post('/', requireAuth, this.controller.createCountry);
        this.router.put('/:id', requireAuth, this.controller.updateCountry);
        this.router.delete('/:id', requireAuth, this.controller.deleteCountry);
    }
}