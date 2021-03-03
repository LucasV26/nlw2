import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class userController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        const usersRepository = getRepository(User);

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            // Status 400 de BadRequest para cadastro de usuario repetido
            return response.status(400).json({
                error: "Usuario ja cadastrado"
            })
        }

        const user = usersRepository.create({ name, email });

        await usersRepository.save(user);

        return response.json(user);
    }
}

export { userController };