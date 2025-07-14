import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      //   url: "postgresql://postgres:825273@localhost:5434/quranDailyDevDB?schema=public",
      port: 5434,
      username: "postgres",
      password: "825273",
      database: "quranDailyDevDB",
      entities: [],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
