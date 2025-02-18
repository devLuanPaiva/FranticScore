import { team } from "../__mocks__/mocks";
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
   
    mockRepo.getTeamByName.mockResolvedValueOnce(team)
    await expect(teamService.addTeam(team)).rejects.toThrow('O time já foi cadastrado!')
  })
  test("should add a valid team", async () => {
    mockRepo.getTeamById.mockResolvedValue(team)
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
  test("should get a team by ID", async () => {
    mockRepo.getTeamById.mockResolvedValue(team);
    const result = await teamService.getTeamById("1");
    expect(result).toEqual(team);
  })
  test("should get a team by name", async () => {
    mockRepo.getTeamByName.mockResolvedValue(team);
    const result = await teamService.getTeamByName("Team A");
    expect(result).toEqual(team);
  });
});
