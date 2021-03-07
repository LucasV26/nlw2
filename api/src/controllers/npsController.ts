import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { surveysUsersRepository } from "../repositories/surveysUsersRepository";

class npsController {

    /**
     * Calculo do NPS:
     * 1 2 3 4 5 6 7 8 9 10
     * Detratores: 0 <-> 6
     * Passivos: 7 <-> 8
     * Promotores: 9 <-> 10
     * 
     * Passivos são desconsiderados
     * 
     * Cálculo:
     * ((Nº de promotores - Nº de detratores) / (Nº de respostas)) * 100
     */

    async execute(request: Request, response: Response) {
        const { survey_id } = request.params

        const SurveysUsersRepository = getCustomRepository(surveysUsersRepository);

        const surveyAnswers = await SurveysUsersRepository.find({
            survey_id,
            value: Not(IsNull())
        });

        const detractors = surveyAnswers.filter(
            (answer) => answer.value >= 1 && answer.value <= 6
        ).length;

        const passives = surveyAnswers.filter(
            (answer) => answer.value >= 7 && answer.value <= 8
        ).length;

        const promoters = surveyAnswers.filter(
            (answer) => answer.value >= 9 && answer.value <= 10
        ).length;


        const totalAnswers = surveyAnswers.length;

        const nps = Number(
            (((promoters - detractors) / totalAnswers) * 100).toFixed(2)
        );

        return response.json({
            detractors,
            passives,
            promoters,
            totalAnswers,
            nps
        });
    }
}

export { npsController };