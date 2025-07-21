import { Expose } from "class-transformer";

export class UserDataPublicDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  username: string;
}
