import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import '../database';
import { routes } from '../../api/routes';
import { handleError } from '../helpers/error';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use((err, req, res, next) => {
    handleError(err, res);
});

const http = createServer(app);

export { http }