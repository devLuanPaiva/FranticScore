import { Module } from "@nestjs/common";
import { DbModule } from "src/database/db.module";
import { TeamService } from "./team.service";
import { TeamController } from "./teams.controller";

@Module({
    imports: [DbModule],
    providers: [TeamService],
    controllers: [TeamController]
})
export class TeamModule { }