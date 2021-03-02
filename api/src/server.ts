import express from 'express';

const app = express();

/*
    Métodos HTTP existentes:

    * GET => Buscar
    * POST => Salvar/Inserir
    * PUT => Alterar
    * DELETE => Deletar
    * PATCH => Alteração Específica
*/

// Neste metodo e inserido o nome da rota a ser acessada
app.get("/", (request, response) => {

    return response.json({ message: "Sai do meu servidor, na moralzinha" });
}); // No caso, o usuario iria para http://localhost:3333/

// 1º parametro => Rota (Recurso API)
// 2º parametro => Request / Response
app.post("/", (request, response) => {

    return response.json({ message: "Dado cadastrado com sucesso ;-;" });
});

app.listen(3333, () => console.log("(: Deu tudo certo :)"));