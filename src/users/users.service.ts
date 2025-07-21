import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string, username: string) {
    const user = this.repo.create({ email, password, username });
    return this.repo.save(user);
  }

  findOneByEmail(email: string) {
    if (!email) {
      return null;
    }
    return this.repo.findOne({ where: { email } });
  }
}
