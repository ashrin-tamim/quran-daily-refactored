import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { Settings } from './settings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService],
  imports: [TypeOrmModule.forFeature([Settings])]
})
export class SettingsModule {}
