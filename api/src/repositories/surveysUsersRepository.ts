import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/SurveyUser";

@EntityRepository(SurveyUser)
class surveysUsersRepository extends Repository<SurveyUser>{ };

export { surveysUsersRepository };