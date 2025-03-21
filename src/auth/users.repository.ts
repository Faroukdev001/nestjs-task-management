import { DataSource, EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";


@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(datasource: DataSource) {
        super(User, datasource.createEntityManager());
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password }  = authCredentialsDto;
        const user = this.create({ username, password })
        await this.save(user);
    }

}