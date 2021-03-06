//Modularizando as configurações do app do express para que os testes não inicializem o servidor real
import { app } from "./app";

app.listen(3333, () => console.log("Servidor rodando corretamente :) "));