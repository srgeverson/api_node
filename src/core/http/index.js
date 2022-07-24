import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

import { handleError } from '../helpers/error';

const app = express();

app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
    handleError(err, res);
});

const http = createServer(app);

export { http }
