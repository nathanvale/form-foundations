jest.mock('./execGitCmd');
const { execGitCmd } = require('./execGitCmd');
const { getLeaderBoard } = require('./getLeaderBoard');

beforeEach(() => {
  execGitCmd.mockReset();
});

describe('leaderBoard', () => {
  it('should ', () => {
    const execGitCmdResult = [
      '146\tNathan Vale <nathan.vale@originenergy.com.au>',
      '    42\tMir Mehdi <mirsajjad.mehdi@originenergy.com.au>',
      '     5\tMahesh Jadav <mahesh.jadav@originenergy.com.au>'
    ];
    execGitCmd.mockImplementationOnce(() => execGitCmdResult);
    const args = [
      'shortlog',
      '-s',
      '-n',
      '-e',
      '--all',
      '--since',
      '60.days',
      '--no-merges',
      'main'
    ];

    const actual = getLeaderBoard()
      .then(data => {
        expect(execGitCmd).toBeCalledWith(args);
        expect(execGitCmd).toReturnWith(execGitCmdResult);
        expect(actual).toEqual(execGitCmdResult);
      })
      .catch(e => {
        expect(e).toBeDefined;
      });
  });
});
