const getLeaderBoard = jest.fn(() => ({ days = 60 }) => [
  '146\tNathan Vale <nathan.vale@originenergy.com.au>',
  '    42\tMir Mehdi <mirsajjad.mehdi@originenergy.com.au>',
  '     5\tMahesh Jadav <mahesh.jadav@originenergy.com.au>'
]);
exports.getLeaderBoard = getLeaderBoard;
