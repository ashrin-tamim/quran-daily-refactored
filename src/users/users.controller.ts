import { Controller, Post, Body } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { AuthService } from "./auth.service";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDataPublicDto } from "./dtos/user-data-public.dto";

@Controller("auth")
@Serialize(UserDataPublicDto)
export class UsersController {
  constructor(private authService: AuthService) {}

  @Post("/signUp")
  createUser(@Body() userData: CreateUserDto) {
    return this.authService.signUp(userData.email, userData.password);
  }
}
