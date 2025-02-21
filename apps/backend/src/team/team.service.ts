import { Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ECategoryTeam, ETypeTeam, ITeam, ITeamsRepository } from '@frantic/core'


@Injectable()
export class TeamService implements ITeamsRepository {
    constructor(readonly prisma: PrismaService) { }
    async getTeams(): Promise<ITeam[]> {
        return this.prisma.team.findMany({
            include: {
                games1: true,
                games2: true,
            },
        }) as unknown as ITeam[];
    }

    async getTeamById(id: string): Promise<ITeam> {
        const team = await this.prisma.team.findUnique({
            where: { id },
            include: {
                games1: true,
                games2: true,
            },
        });
        if (!team) throw new NotFoundException("Time não encontrado!");
        return team as unknown as ITeam;
    }

    async getTeamByName(name: string): Promise<ITeam> {
        const team = await this.prisma.team.findFirst({
            where: { name },
            include: {
                games1: true,
                games2: true,
            },
        });
        if (!team) throw new NotFoundException("Time não encontrado!");
        return team as unknown as ITeam;
    }

    async addTeam(team: Partial<ITeam>): Promise<void> {
        const existingTeam = await this.getTeamByName(team.name!);
        if (existingTeam) throw new ConflictException("O time já foi cadastrado!");

        await this.prisma.team.create({
            data: {
                name: team.name!,
                image: team.image,
                category: team.category ? (team.category as ECategoryTeam) : ECategoryTeam.SUB13MEN,
                type: team.type as ETypeTeam,
                goals: team.goals,
                goalByGame: team.goalByGame,
                group: team.group!,
            },
        });
    }

    async updateTeam(id: string, team: Partial<ITeam>): Promise<void> {
        const existingTeam = await this.getTeamById(id);
        if (!existingTeam) throw new NotFoundException("Time não encontrado!");

        await this.prisma.team.update({
            where: { id },
            data: {
                name: team.name,
                image: team.image,
                category: team.category as ECategoryTeam,
                type: team.type as ETypeTeam,
                goals: team.goals,
                goalByGame: team.goalByGame,
                group: team.group,
            },
        });
    }

    async deleteTeam(id: string): Promise<void> {
        const existingTeam = await this.getTeamById(id);
        if (!existingTeam) throw new NotFoundException("Time não encontrado!");

        await this.prisma.team.delete({
            where: { id },
        });
    }
}

