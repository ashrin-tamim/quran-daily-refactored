import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/user.entity";
import { SettingsModule } from './settings/settings.module';
import { Settings } from "./settings/settings.entity";

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
      entities: [User, Settings], 
      synchronize: true,
    }),
    UsersModule,
    SettingsModule,
  ],
})
export class AppModule {}
