import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";

import createConnection from "../database";

describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = await getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
            name: "NomeTeste",
            email: "usuario@teste.com"
        });

        expect(response.status).toBe(201);
    });

    it("Should not be able to create two users with same e-mail", async () => {
        const response = await request(app).post("/users").send({
            name: "NomeTeste",
            email: "usuario@teste.com"
        });

        expect(response.status).toBe(400);
    });
});