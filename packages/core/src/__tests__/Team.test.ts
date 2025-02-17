import { ECategoryTeam, ITeam, ITeamsRepository, Team } from "../teams";

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
});
