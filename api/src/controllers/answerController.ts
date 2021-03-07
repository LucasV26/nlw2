import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { appError } from "../errors/appError";
import { surveysUsersRepository } from "../repositories/surveysUsersRepository";

class answerController {
    async execute(request: Request, response: Response) {
        // http://localhost:3333/answer/6?id=cae8a34b-1602-4b42-aac0-a5664eea8054

        /**
         * Route Params: Parametros que são enviados pela rota (o /6 na URL)
         * São recuperados a partir da notação :nome -> "/answers/:value"
         * 
         * Query Params: Busca, paginação, não obrigatórios. São enviados após o ? na URL
         * estrutura: nome=valor
         */
        const { value } = request.params;
        const { id } = request.query;

        const SurveyUserRepository = getCustomRepository(surveysUsersRepository);

        const surveyUser = await SurveyUserRepository.findOne({ id: String(id) });

        if (!surveyUser) {
            throw new appError("This user does not exists!");
        }

        surveyUser.value = Number(value);

        await SurveyUserRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { answerController }