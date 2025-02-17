import { IGames } from "../../games/model/IGames.interface";
import { ECategoryTeam } from "./ECaterogy.enum";
import { ETypeTeam } from "./ETypeTeam.enum";

export interface ITeam {
    id: string;
    name: string;
    image?: string;
    category: ECategoryTeam;
    type: ETypeTeam;
    goals?: string;
    goalByGame?: string;
    group: string;
    games?: IGames[];
}