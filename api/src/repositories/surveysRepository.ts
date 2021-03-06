import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

@EntityRepository(Survey)
class surveysRepository extends Repository<Survey>{ }

export { surveysRepository };