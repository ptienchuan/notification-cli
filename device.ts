import yargs from 'yargs';
import chalk from 'chalk';
import { dropDeviceTokens, getDeviceTokens } from './services/notification';
import {
  log,
  logTable,
  logProcessing,
  logErrorHeading,
  logSuccessHeading,
} from './utils/log';
import errorHander from './utils/error-handler';

yargs.command('fetch', 'Get list device tokens', {}, async (_) => {
  try {
    logProcessing('Fetching ...');
    const tokens = await getDeviceTokens();
    if (!tokens.length) {
      logErrorHeading('There has 0 tokens');
      return;
    }

    logSuccessHeading(`We found ${chalk.red(tokens.length)} tokens`);
    logTable(tokens);
  } catch (error) {
    errorHander(error);
  }
});

yargs.command(
  'drop',
  'Drop device token',
  {
    token: {
      alias: 't',
      array: true,
      requiresArg: true,
      string: true,
      description:
        'Tokens of device, you can see the list tokens by command fetch',
    },
  },
  async (args) => {
    try {
      const { token } = args;
      if (!token) throw new Error('Nothing to do!');

      logProcessing('Handling ...');
      const droppedTokens = await dropDeviceTokens(token);

      logSuccessHeading(`${droppedTokens.length} tokens has been dropped:`);
      droppedTokens.forEach((droppedToken) => log(`  ${droppedToken}`));
    } catch (error) {
      errorHander(error);
    }
  }
);

yargs.parse();
