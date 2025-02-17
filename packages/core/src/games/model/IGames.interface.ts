import { ITeam } from "../../teams";
import { EStateGame } from "./EStateGame.enum";

export interface IGames{
    id: string;
    team1: ITeam;
    team2: ITeam;
    date: Date;
    time: number;
    location: string;
    state: EStateGame
}