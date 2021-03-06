import 'reflect-metadata';
import express from 'express';
import createConnection from "./database"; // Nao e necessario especificar o index... Ele reconhece o index sozinho
import { router } from './routes';

createConnection();
const app = express();

app.use(express.json()); // habilitando a funcionalidade de receber body`s em JSON das requests
app.use(router);

export { app }