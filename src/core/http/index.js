import express from 'express';
import { routes } from '../../api/routes';
import cors from 'cors';
import path from 'path';
import '../../domain/model';
import { handleError } from '../helpers/error';

class Http {

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());

        //Publicando fotos
        this.app.use(
            '/v1/imagens',
            express.static(path.resolve(__dirname, "..", "..", "infrastructure", "tmp", "enviados"))
        );

        //Habilitando o urlencoded para a autenticação com OAuth
        this.app.use(express.urlencoded({
            extended: true
        }));

        //Configuração do CORS
        this.app.use((err, req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE');
            res.header("Access-Control-Allow-Headers", 'X-PINGOTHER, Content-Type, Authorization');
            this.app.use(cors());
            handleError(err, res);
            next();
        })
    }

    routes() {
        this.app.use(routes);
    }
}

export default Http;