import * as yargs from 'yargs';
import * as chalk from 'chalk';
import { getDeviceTokens } from './services/notification';
import {
  log,
  logTable,
  logProcessing,
  logErrorHeading,
  logSuccessHeading,
} from './utils/log';

yargs.command('fetch', 'Get list device tokens', {}, (_) => {
  logProcessing('Fetching ...');
  getDeviceTokens()
    .then((tokens) => {
      if (!tokens.length) {
        logErrorHeading('There has 0 tokens');
        return;
      }

      logSuccessHeading(`We found ${chalk.red(tokens.length)} tokens`);
      logTable(tokens);
      return;
    })
    .catch((err) => {
      logErrorHeading('Opps, we got an error');
      log(err);
    });
});

yargs.parse();
