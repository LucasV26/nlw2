import { Router } from 'express';
import { userController } from './controllers/userController';
/*
    Métodos HTTP existentes:

    * GET => Buscar
    * POST => Salvar/Inserir
    * PUT => Alterar
    * DELETE => Deletar
    * PATCH => Alteração Específica
*/
const router = Router();
const UserController = new userController();

router.post("/users", UserController.create);

export { router };