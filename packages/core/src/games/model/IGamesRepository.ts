import { ETypeTeam } from "../../teams";
import { ECategoryTeam } from "../../teams/model/ECaterogy.enum";
import { EStateGame } from "./EStateGame.enum";
import { IGames } from "./IGames.interface";

export interface IGamesRepository {
    getGames(): Promise<IGames[]>;
    getGameById(id: number): Promise<IGames>;
    getGamesFromCategory(category: ECategoryTeam): Promise<IGames[]>;
    getGamesFromType(type: ETypeTeam): Promise<IGames[]>;
    getGamesFromDate(date: Date): Promise<IGames[]>;
    getGamesFromTeam(teamId: number): Promise<IGames[]>;
    addGame(game: Partial<IGames>): Promise<IGames>;
    updateGame(id: number, game: Partial<IGames>): Promise<void>;
    updateState(id: number, state: EStateGame): Promise<void>;
}