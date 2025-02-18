import { ECategoryTeam, ETypeTeam, ITeam, ITeamsRepository, Team } from "../teams";

const mockRepo: jest.Mocked<ITeamsRepository> = {
  addTeam: jest.fn(),
  getTeamByName: jest.fn(),
  getTeamById: jest.fn(),
  updateTeam: jest.fn(),
  deleteTeam: jest.fn(),
  getTeams: jest.fn(),
};
describe("Team class", () => {
  let teamService: Team;

  beforeEach(() => {
    jest.clearAllMocks();
    teamService = new Team(mockRepo);
  });
  test("should not add a team with missing fields", async () => {
    const incompleteTeam: Partial<ITeam> = { name: "Team B" };

    await expect(teamService.addTeam(incompleteTeam)).rejects.toThrow("Todos os campos obrigatórios devem ser preenchidos!");
  });
  test("should not add a duplicate team", async () => {
    const team: Partial<ITeam> = {
      name: "Team A",
      category: "SUB15MEN" as ECategoryTeam,
      type: "FUTSAL" as ETypeTeam,
      group: "A",
    }
    mockRepo.getTeamByName.mockResolvedValueOnce(team as ITeam)
    await expect(teamService.addTeam(team)).rejects.toThrow('O time já foi cadastrado!')
  })
  test("should add a valid team", async () => {
    const existingTeam: ITeam = {
      id: "1",
      name: "Team A",
      category: "SUB15MEN" as ECategoryTeam,
      type: "FUTSAL" as ETypeTeam,
      group: "A",
    };
    mockRepo.getTeamById.mockResolvedValue(existingTeam)
    await teamService.updateTeam("1", { name: "Updated Team" })
    expect(mockRepo.updateTeam).toBeCalledWith("1", { name: "Updated Team" })
  })
  test("should get all teams", async () => {
    const teams: ITeam[] = [
      {
        id: "1",
        name: "Team A",
        category: "SUB15MEN" as ECategoryTeam,
        type: "FUTSAL" as ETypeTeam,
        group: "A",
      },
    ];
    mockRepo.getTeams.mockResolvedValue(teams);
    const result = await teamService.getTeams();
    expect(result).toEqual(teams);
  })
});
