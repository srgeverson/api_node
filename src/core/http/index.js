import express from 'express';
import cors from 'cors';
import path from 'path';
import https from 'https';
import http from 'http';
import fs from 'fs';
import { routes } from '../../api/routes';
import '../../domain/model';

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
        this.app.use(cors());
    }

    routes() {
        this.app.use(routes);
    }

    protocoloHttps() {
        return https.createServer({
            key: fs.readFileSync(`${__dirname}/../../../key_api_node.pem`),
            cert: fs.readFileSync(`${__dirname}/../../../cert_api_node.pem`)
        }, this.app);
    }
    
    protocoloHttp() {
        return http.createServer({
            key: fs.readFileSync(`${__dirname}/../../../key_api_node.pem`),
            cert: fs.readFileSync(`${__dirname}/../../../cert_api_node.pem`)
        }, this.app);
    }
}

export default Http;