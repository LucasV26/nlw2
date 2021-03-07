import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { usersRepository } from "../repositories/usersRepository";
import { appError } from "../errors/appError";
import * as yup from "yup";

class userController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        });

        // Validando os dados
        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            throw new appError(err);
        }

        // Outro modo de validar os dados
        // if (!(await schema.isValid(request.body)))
        //     return response.status(400).json({
        //         error: "Validation failed!"
        //     })

        const UsersRepository = getCustomRepository(usersRepository);

        const userAlreadyExists = await UsersRepository.findOne({
            email
        }); //SELECT * FROM Users WHERE Email = email

        if (userAlreadyExists) {
            // Status 400 de BadRequest para cadastro de usuario repetido
            throw new appError("Usuario ja cadastrado");
        }

        const user = UsersRepository.create({ name, email });

        await UsersRepository.save(user);

        return response.status(201).json(user);
    }
}

export { userController };
