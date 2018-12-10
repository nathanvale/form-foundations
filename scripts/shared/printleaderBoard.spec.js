jest.mock('../git/getLeaderBoard');
const { getLeaderBoard } = require('../git/getLeaderBoard');
const { printLeaderBoard } = require('./printLeaderBoard');

beforeEach(() => {
  getLeaderBoard.mockReset();
});

describe('leaderBoard', () => {
  afterEach(() => {});
  it('should print the leaderboard when there are authors ', () => {
    const printLeaderBoardResult = [
      '146\tNathan Vale <nathan.vale@originenergy.com.au>',
      '    42\tAli Motevallian <ali.motevallian@originenergy.com.au>',
      '    42\tMir Mehdi <mirsajjad.mehdi@originenergy.com.au>',
      '     5\tMahesh Jadav <mahesh.jadav@originenergy.com.au>',
      '     1\tJenkins <jenkins@originenergy.com.au>'
    ];
    getLeaderBoard.mockResolvedValue(printLeaderBoardResult);
    printLeaderBoard().then(data => {
      const expected = {
        last30Days: [
          { email: '<nathan.vale@originenergy.com.au>', name: 'Nathan Vale' },
          {
            email: '<ali.motevallian@originenergy.com.au>',
            name: 'Ali Motevallian'
          },
          { email: '<mahesh.jadav@originenergy.com.au>', name: 'Mahesh Jadav' }
        ],
        last6Months: [
          { email: '<nathan.vale@originenergy.com.au>', name: 'Nathan Vale' },
          {
            email: '<ali.motevallian@originenergy.com.au>',
            name: 'Ali Motevallian'
          },
          { email: '<mahesh.jadav@originenergy.com.au>', name: 'Mahesh Jadav' }
        ],
        last7Days: [
          { email: '<nathan.vale@originenergy.com.au>', name: 'Nathan Vale' },
          {
            email: '<ali.motevallian@originenergy.com.au>',
            name: 'Ali Motevallian'
          },
          { email: '<mahesh.jadav@originenergy.com.au>', name: 'Mahesh Jadav' }
        ]
      };
      expect(data).toEqual(expected);
      expect(getLeaderBoard).toBeCalledTimes(3);
      expect(getLeaderBoard).toHaveBeenNthCalledWith(1, { days: 7 });
      expect(getLeaderBoard).toHaveBeenNthCalledWith(2, { days: 30 });
      expect(getLeaderBoard).toHaveBeenNthCalledWith(3, { days: 182 });
    });
  });
  it('should not print the leaderboard when there are no authors ', () => {
    const printLeaderBoardResult = [''];
    getLeaderBoard.mockResolvedValue(printLeaderBoardResult);
    const actual = printLeaderBoard().then(data => {
      const expected = { last30Days: [], last6Months: [], last7Days: [] };
      expect(data).toEqual(expected);
      expect(getLeaderBoard).toBeCalledTimes(3);
      expect(getLeaderBoard).toHaveBeenNthCalledWith(1, { days: 7 });
      expect(getLeaderBoard).toHaveBeenNthCalledWith(2, { days: 30 });
      expect(getLeaderBoard).toHaveBeenNthCalledWith(3, { days: 182 });
    });
  });
});
