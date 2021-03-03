import 'reflect-metadata';
import express from 'express';
import "./database"; // Nao e necessario especificar o index... Ele reconhece o index sozinho
import { router } from './routes';

const app = express();

app.use(express.json()); // habilitando a funcionalidade de receber body`s em JSON das requests
app.use(router);

app.listen(3333, () => console.log("Servidor rodando corretamente :) "));