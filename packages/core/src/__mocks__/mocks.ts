import { EStateGame, IGames } from "../games";
import { ECategoryTeam, ETypeTeam, ITeam } from "../teams";

export const mockGame: IGames = {
  id: "1",
  team1: {
    id: "t1",
    name: "Time 1",
    category: "SUB15MEN" as ECategoryTeam,
    type: "FUTSAL" as ETypeTeam,
    group: "A",
  },
  team2: {
    id: "t2",
    name: "Time 2",
    category: "SUB15MEN" as ECategoryTeam,
    type: "FUTSAL" as ETypeTeam,
    group: "A",
  },
  date: new Date(),
  time: 15,
  location: "Estádio 1",
  state: "AGUARDANDO" as EStateGame,
};

export const team: ITeam = {
  id: "1",
  name: "Team A",
  category: "SUB15MEN" as ECategoryTeam,
  type: "FUTSAL" as ETypeTeam,
  group: "A",
};
