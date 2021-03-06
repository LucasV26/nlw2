import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { usersRepository } from "../repositories/usersRepository";

class userController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const UsersRepository = getCustomRepository(usersRepository);

        const userAlreadyExists = await UsersRepository.findOne({
            email
        }); //SELECT * FROM Users WHERE Email = email

        if (userAlreadyExists) {
            // Status 400 de BadRequest para cadastro de usuario repetido
            return response.status(400).json({
                error: "Usuario ja cadastrado"
            })
        }

        const user = UsersRepository.create({ name, email });

        await UsersRepository.save(user);

        return response.status(201).json(user);
    }
}

export { userController };
