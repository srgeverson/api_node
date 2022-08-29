import express from 'express';
import { routes } from '../../api/routes';
import cors from 'cors';
import path from 'path';
import '../../domain/model';

class Http {

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        console.log('middlewares....');

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
        this.app.use(cors());
    }

    routes() {
        this.app.use(routes);
    }
}

export default Http;