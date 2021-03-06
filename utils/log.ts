import chalk from 'chalk';

export const log = console.log;

export const logTable = console.table;

export const logErrorHeading = (text: unknown) =>
  log(chalk.bgRed.bold(` ${text} `));

export const logSuccessHeading = (text: unknown) => log(chalk.green(text));

export const logHandling = (text: unknown = 'Handling ...') =>
  log(chalk.gray(text));

export const logError = (text: unknown) => log(chalk.red(text));
