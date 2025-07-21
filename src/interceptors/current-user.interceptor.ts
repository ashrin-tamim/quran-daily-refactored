import { NestInterceptor, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const { userEmail } = request.session;

    if (!userEmail) {
      throw new UnauthorizedException("User not logged in");
    }

    const user = await this.usersService.findOneByEmail(userEmail);
    if (!user) {
      throw new BadRequestException("User not found");
    }

    request.currentUser = user;
    return handler.handle();
  }
}
