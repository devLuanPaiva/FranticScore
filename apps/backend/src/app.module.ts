import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbModule } from './database/db.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [DbModule, TeamModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
