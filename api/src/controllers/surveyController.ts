import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { appError } from "../errors/appError";
import { surveysRepository } from "../repositories/surveysRepository"

class surveyController {

    async create(request: Request, response: Response) {
        const { title, description } = request.body;

        const schema = yup.object().shape({
            title: yup.string().required(),
            description: yup.string().required()
        });

        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (err) {
            throw new appError(err);
        }

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