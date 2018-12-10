jest.mock("./execGitCmd");
const { execGitCmd } = require("./execGitCmd");
const { commitsOnBranch } = require("./commitsOnBranch");

beforeEach(() => {
  execGitCmd.mockReset();
});

describe("commitsOnBranch", () => {
  it("should ", () => {
    execGitCmd.mockImplementationOnce(() => {
      return 0;
    });
    const actual = commitsOnBranch();
    expect(execGitCmd).toBeCalledWith([
      "rev-list",
      "--count",
      "--no-merges",
      "origin/master"
    ]);

    expect(actual).toBe(0);
  });
});
