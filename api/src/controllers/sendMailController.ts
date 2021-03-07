import { resolve } from "path";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { surveysRepository } from "../repositories/surveysRepository";
import { surveysUsersRepository } from "../repositories/surveysUsersRepository";
import { usersRepository } from "../repositories/usersRepository";
import sendMailService from "../services/sendMailService";
import { appError } from "../errors/appError";

class sendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const UsersRepository = getCustomRepository(usersRepository);
        const SurveysRepository = getCustomRepository(surveysRepository);
        const SurveysUsersRepository = getCustomRepository(surveysUsersRepository);

        const user = await UsersRepository.findOne({ email });
        const survey = await SurveysRepository.findOne({ id: survey_id });

        if (!user)
            throw new appError("User does not exists!");

        if (!survey)
            throw new appError("Survey does not exists!");

        const userHaventAnswerdThisSurvey = await SurveysUsersRepository.findOne({
            where: { survey_id, user_id: user.id },
            relations: [
                "user", "survey"
            ]
        });

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");
        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        }

        if (userHaventAnswerdThisSurvey) {
            if (userHaventAnswerdThisSurvey.value == null) {
                variables.id = userHaventAnswerdThisSurvey.id;
                await sendMailService.execute(email, survey.title, variables, npsPath);
            }
            return response.json(userHaventAnswerdThisSurvey);
        }

        //Proximas etapas: 

        //Salvar dados no banco
        const surveyUser = SurveysUsersRepository.create({
            user_id: user.id,
            survey_id
        });

        await SurveysUsersRepository.save(surveyUser);

        //Enviar email
        variables.id = surveyUser.id;
        await sendMailService.execute(email, survey.title, variables, npsPath);


        return response.json(surveyUser);
    }
}

export { sendMailController };