import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import createConnection from "./database"; // Nao e necessario especificar o index... Ele reconhece o index sozinho
import { router } from './routes';
import { appError } from './errors/appError';

createConnection();
const app = express();

app.use(express.json()); // habilitando a funcionalidade de receber body`s em JSON das requests
app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof appError) {
        return response.status(err.errorStatus).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`
    });
});

export { app }