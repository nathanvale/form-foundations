const cTable = require('console.table');
const chalk = require('chalk');

const { getLeaderBoard } = require('../git/getLeaderBoard');

function formatShortLog(authors) {
  // git shortlog return no authors
  if (authors.length === 1 && authors[0] === '') {
    return [];
  } else {
    return (
      authors
        // transform the git shortlog authors returned into a json array of objects
        .map(author => {
          const element = author.trim().split('\t');
          const commits = element[0];
          // pluck out the email address
          const regex = /\<(.*?)\>/g;
          const email = element[1].match(regex)[0];
          const name = element[1].replace(email, '').trim();
          return {
            name,
            email
          };
        })
        // filter out dev ops and ci git users
        .filter(
          author =>
            author.email !== '<mirsajjad.mehdi@originenergy.com.au>' &&
            author.email !== '<jenkins@originenergy.com.au>'
        )
        // only show the top 3
        .slice(0, 3)
    );
  }
}

function print(authors = [], period = 'unknown period') {
  authors.length > 0 &&
    console.log(chalk.bold(`Top contributors in the last ${period}:\n`));
  authors.length > 0 && console.table(authors);
}

async function printLeaderBoard() {
  let last7Days = formatShortLog(await getLeaderBoard({ days: 7 }));
  let last30Days = formatShortLog(await getLeaderBoard({ days: 30 }));
  let last6Months = formatShortLog(await getLeaderBoard({ days: 182 }));

  console.log(chalk.blue.bold('Questions? Try asking…\n\n'));

  print(last7Days, 'week');
  print(last30Days, 'month');
  print(last6Months, '6 months');

  return { last7Days, last30Days, last6Months };
}
exports.printLeaderBoard = printLeaderBoard;
