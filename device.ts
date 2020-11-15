import yargs from 'yargs';
import chalk from 'chalk';
import { dropDeviceTokens } from './services/notification';
import { log, logHandling, logSuccessHeading } from './utils/log';
import errorHander from './utils/error-handler';
import deviceHandler from './handlers/device';

yargs.command('fetch', 'Update the list of device tokens', {}, async (_) => {
  try {
    logHandling();
    const { added, removed } = await deviceHandler.fetch();

    logSuccessHeading('Fetching success!');
    log(`  ${chalk.green(`+ ${added}`)} tokens`);
    log(`  ${chalk.red(`- ${removed}`)} tokens`);
    log('Run list command to see all tokens');
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

      logHandling();
      const droppedTokens = await dropDeviceTokens(token);

      logSuccessHeading(`${droppedTokens.length} tokens has been dropped:`);
      droppedTokens.forEach((droppedToken) => log(`  ${droppedToken}`));
    } catch (error) {
      errorHander(error);
    }
  }
);

yargs.parse();
