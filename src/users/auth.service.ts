import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { User } from "./entities/user.entity";

const scrypt = promisify(_scrypt);

const SALT_LENGTH = 16;
const HASH_LENGTH = 32;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // Sign up a new user
  async signUp(email: string, password: string): Promise<User> {
    let existingUser: User[];
    try {
      existingUser = await this.usersService.findAllByEmail(email);
    } catch (error) {
      throw new InternalServerErrorException("Database connection error");
    }

    if (existingUser.length > 0) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword = await this.hashPassword(password);

    let user: User;
    try {
      user = await this.usersService.create(email, hashedPassword);
    } catch (error) {
      throw new InternalServerErrorException("User creation failed");
    }

    return user;
  }

  // Hash a password
  private async hashPassword(password: string): Promise<string> {
    try {
      const salt = randomBytes(SALT_LENGTH).toString("hex");
      const hash = (await scrypt(password, salt, HASH_LENGTH)) as Buffer;
      return `${salt}.${hash.toString("hex")}`;
    } catch (error) {
      throw new InternalServerErrorException("Password hashing failed");
    }
  }
}
