import { ITeam } from "./ITeam.interface";
import { ITeamsRepository } from "./ITeamRepository.interface";

export default class Team {
    constructor(private readonly repo: ITeamsRepository) { }
    async addTeam(team: Partial<ITeam>): Promise<void> {
        if (!team.category || !team.group || !team.name || !team.type) {
            throw new Error("Todos os campos obrigatórios devem ser preenchidos!");
        }
        const hasTeam = await this.repo.getTeamByName(team.name!);
        if (hasTeam) {
            throw new Error("O time já foi cadastrado!");
        }
        await this.repo.addTeam(team);
    }
    async updateTeam(id: string, team: Partial<ITeam>): Promise<void> {
        const existingTeam = await this.repo.getTeamById(id);
        if (!existingTeam) {
            throw new Error("Time não encontrado!");
        }

        if (team.name && team.name.trim() === "") {
            throw new Error("O nome do time não pode ser vazio!");
        }
        await this.repo.updateTeam(id, team);
    }
    async deleteTeam(id: string): Promise<void> {
        const existingTeam = await this.repo.getTeamById(id);
        if (!existingTeam) {
            throw new Error("Time não encontrado!");
        }
        await this.repo.deleteTeam(id);
    }
    async getTeams(): Promise<ITeam[]> {
        return this.repo.getTeams();
    }
    async getTeamById(id: string): Promise<ITeam> {
        const team = await this.repo.getTeamById(id);
        if (!team) {
            throw new Error("Time não encontrado!");
        }
        return team;
    }
    async getTeamByName(name: string): Promise<ITeam> {
        if (!name || name.trim() === "") {
            throw new Error("Nome inválido!");
        }

        const team = await this.repo.getTeamByName(name);
        if (!team) {
            throw new Error("Time não encontrado!");
        }
        return team;
    }
}