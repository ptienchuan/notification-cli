import chalk from 'chalk';

export const log = console.log;
export const logTable = console.table;

export const logErrorHeading = (text: unknown) =>
  log(chalk.bgRed.bold(` ${text} `));
export const logSuccessHeading = (text: unknown) =>
  log(chalk.bgGreen.black.bold(` ${text} `));
export const logProcessing = (text: unknown) => log(chalk.gray(text));
export const logError = (text: unknown) => log(chalk.red(text));
