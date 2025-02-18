import { ITeam } from "./ITeam.interface";

export interface ITeamsRepository {
    getTeams(): Promise<ITeam[]>;
    getTeamById(id: string): Promise<ITeam>;
    getTeamByName(name: string): Promise<ITeam>;
    addTeam(team: Partial<ITeam>): Promise<void>;
    updateTeam(id: string, team: Partial<ITeam>): Promise<void>;
    deleteTeam(id: string): Promise<void>;
}