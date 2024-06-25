import express from "express";
import routes from "./routes/routes";
import bodyParser from "body-parser"
import { currentUser } from "./middlewares/currentUser";
import { errorHandler } from "./middlewares/errorHandler";
import morgan from "morgan";
import cors from 'cors';
class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    public config(): void {
        this.app.disable("x-powered-by");
        this.app.set('port', process.env.PORT || 3000);
        this.app.set('trust proxy', true);
        this.app.use(cors());
        this.app.use(morgan('tiny'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(currentUser);
        routes(this.app)
        this.app.all('*', async (req, res) => { res.status(404).send('Página no encontrada')});
        this.app.use(errorHandler);
    }

    public async start() {
        this.app.listen(this.app.get('port'), () => console.log('Server listening in port', this.app.get('port')));
    }
}

const server = new Server();
server.start();