import { Router } from 'express';
import { sendMailController } from './controllers/sendMailController';
import { surveyController } from './controllers/surveyController';
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
const SurveyController = new surveyController();
const SendMailController = new sendMailController();

router.post("/users", UserController.create);

router.post("/surveys", SurveyController.create);
router.get("/surveys", SurveyController.show);

router.post("/send_mail", SendMailController.execute);

export { router };