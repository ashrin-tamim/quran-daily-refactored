import { Controller, Post, Body, Get, Session, UseInterceptors, UseGuards } from "@nestjs/common";
import { signupDto } from "./dtos/signup.dto";
import { signinDto } from "./dtos/signin.dto";
import { AuthService } from "./auth.service";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDataPublicDto } from "./dtos/user-data-public.dto";
import { CurrentUser } from "../decorators/current-user.decorator";
import { User } from "./entities/user.entity";
import { CurrentUserInterceptor } from "../interceptors/current-user.interceptor";
import { AuthGuard } from "../guards/auth.guard";

@Controller("auth")
@Serialize(UserDataPublicDto)
export class UsersController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  signUp(@Body() userData: signupDto, @Session() session: any) {
    return this.authService.signUp(userData, session);
  }

  @Get("/signin")
  signIn(@Body() userData: signinDto, @Session() session: any) {
    return this.authService.signIn(userData, session);
  }

  @Post("/signout")
  signOut(@Session() session: any) {
    return this.authService.signOut(session);
  }

  @Get("/settings")
  @UseInterceptors(CurrentUserInterceptor)
  @UseGuards(AuthGuard)
  settings(@CurrentUser() user: User) {
    return user;
  }
}
