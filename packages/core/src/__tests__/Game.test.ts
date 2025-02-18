import { mockGame, team } from "../__mocks__/mocks";
import { IGamesRepository, Game, IGames, EStateGame } from "../games";
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

    await expect(gameService.addGame(newGame)).resolves.toEqual(mockGame);
  });
  it("should prevent adding a game at the same place and time", async () => {
    mockRepo.getGames.mockResolvedValue([
      { location: "Estádio 1", time: 15 } as IGames,
    ]);

    const newGame: Partial<IGames> = {
      location: "Estádio 1",
      time: 15,
    };

    await expect(gameService.addGame(newGame)).rejects.toThrow("Já existe um jogo neste local e horário");
  });
  it("should prevent adding a game with the same teams", async () => {
    const newGame: Partial<IGames> = {
        team1:team,
        team2: team
    };

    await expect(gameService.addGame(newGame)).rejects.toThrow("O time 1 e o time 2 não podem ser o mesmo time");
  });
});
