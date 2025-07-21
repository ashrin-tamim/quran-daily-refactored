import { IsEmail, IsString } from "class-validator";

export class signupDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}
