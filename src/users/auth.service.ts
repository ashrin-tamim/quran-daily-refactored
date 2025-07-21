import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { User } from "./entities/user.entity";
import { signupDto } from "./dtos/signup.dto";
import { signinDto } from "./dtos/signin.dto";

const scrypt = promisify(_scrypt);

const SALT_LENGTH = 16;
const HASH_LENGTH = 32;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // Sign up a new user
  async signUp(userData: signupDto, session: any): Promise<User> {
    let existingUser: User | null;
    try {
      existingUser = await this.usersService.findOneByEmail(userData.email);
    } catch (error) {
      throw new InternalServerErrorException("Database connection error");
    }

    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword = await this.hashPassword(userData.password);

    let user: User;
    try {
      user = await this.usersService.create(userData.email, hashedPassword, userData.username);
    } catch (error) {
      throw new InternalServerErrorException("User creation failed");
    }

    session.userEmail = user.email;
    return user;
  }

  // Sign in an existing user
  async signIn(userData: signinDto, session: any): Promise<User> {
    const user = await this.usersService.findOneByEmail(userData.email);
    if (!user) {
      throw new BadRequestException("User not found");
    }

    const [salt, storedHash] = user.password.split(".");
    const hash = (await scrypt(userData.password, salt, HASH_LENGTH)) as Buffer;
    if (hash.toString("hex") !== storedHash) {
      throw new BadRequestException("Invalid password");
    }

    session.userEmail = user.email;
    return user;
  }

  // Sign out
  signOut(session: any) {
    session.userEmail = null;
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
