import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { surveysRepository } from "../repositories/surveysRepository"

class surveyController {

    async create(request: Request, response: Response) {
        const { title, description } = request.body;

        const SurveyRepository = getCustomRepository(surveysRepository);

        const survey = SurveyRepository.create({
            title,
            description
        })

        await SurveyRepository.save(survey);

        return response.status(201).json(survey);
    }

    async show(request: Request, response: Response) {

        const SurveyRepository = getCustomRepository(surveysRepository);

        const surveys = await SurveyRepository.find();

        return response.json(surveys);
    }

}

export { surveyController };