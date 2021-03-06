import request from "supertest";
import { app } from "../app";

import createConnection from "../database";

describe("Survey", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "Pesquisa teste",
            description: "Conteudo da pesquisa"
        });

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id");
    });

    it("Should be able to get a list of surveys", async () => {
        await request(app).post("/surveys").send({
            title: "Pesquisa teste2",
            description: "Conteudo da outra pesquisa"
        });

        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2);
    });
});