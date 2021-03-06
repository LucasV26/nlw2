import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
class usersRepository extends Repository<User>{ }

export { usersRepository };