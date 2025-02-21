import { ITeam, Team } from "@frantic/core";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { TeamService } from "./team.service";

@Controller('api/teams')
export class TeamController {
    private readonly team: Team;

    constructor(private readonly teamService: TeamService) {
        this.team = new Team(teamService);
    }

    @Get()
    async getTeams(): Promise<ITeam[]> {
        return this.team.getTeams();
    }

    @Get(':id')
    async getTeam(@Param('id') id: string): Promise<ITeam> {
        return this.team.getTeamById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() team: Partial<ITeam>): Promise<void> {
        return this.team.addTeam(team);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() team: Partial<ITeam>): Promise<void> {
        return this.team.updateTeam(id, team);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<void> {
        return this.team.deleteTeam(id);
    }
}
