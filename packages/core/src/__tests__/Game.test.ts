import { IGamesRepository, Game, IGames, EStateGame,  } from "../games";
import { ECategoryTeam, ETypeTeam } from "../teams";
const mockRepo: jest.Mocked<IGamesRepository> = {
    getGames: jest.fn(),
    addGame: jest.fn(),
    getGameById: jest.fn(),
    getGamesFromCategory: jest.fn(),
    getGamesFromType: jest.fn(),
    getGamesFromDate: jest.fn(),
    getGamesFromTeam: jest.fn(),
    updateGame: jest.fn(),
    updateState: jest.fn(),
};
const mockGame: IGames = {
    id: "1",
    team1: { id: "t1", name: "Time 1", category: "SUB15MEN" as ECategoryTeam, type: "FUTSAL" as ETypeTeam, group: "A" },
    team2: { id: "t2", name: "Time 2", category: "SUB15MEN" as ECategoryTeam, type: "FUTSAL" as ETypeTeam, group: "A" },
    date: new Date(),
    time: 15,
    location: "Estádio 1",
    state: "AGUARDANDO" as EStateGame,
  };
describe("Game class", () => {
    let gameService: Game;

    beforeEach(() => {
      gameService = new Game(mockRepo);
    });
    it("should add a game successful", async () => {
        mockRepo.getGames.mockResolvedValue([]);
        mockRepo.addGame.mockResolvedValue(mockGame);
    
        const newGame: Partial<IGames> = {
          id: "1",
          team1: { id: "t1", name: "Time 1", category: "SUB15MEN" as ECategoryTeam, type: "FUTSAL" as ETypeTeam, group: "A" },
          team2: { id: "t2", name: "Time 2", category: "SUB15MEN" as ECategoryTeam, type: "FUTSAL" as ETypeTeam, group: "A" },
          date: new Date(),
          time: 15,
          location: "Estádio 1",
          state: "AGUARDANDO" as EStateGame,
        };
    
        await expect(gameService.addGame(newGame)).resolves.toEqual(mockGame);
      })
});
