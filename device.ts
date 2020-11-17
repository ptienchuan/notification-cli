import yargs from 'yargs';
import chalk from 'chalk';
import { dropDeviceTokens } from './services/notification';
import { log, logTable, logHandling, logSuccessHeading } from './utils/log';
import errorHander from './utils/error-handler';
import deviceHandler from './handlers/device';

yargs.command('fetch', 'Sync the list of device tokens', {}, async (_) => {
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

yargs.command('list', 'Show the list of device tokens', {}, async (_) => {
  try {
    logHandling();
    const { tokens } = deviceHandler.list();

    logSuccessHeading(`We found ${chalk.red(tokens.length)} tokens`);
    tokens.length && logTable(tokens);
  } catch (error) {
    errorHander(error);
  }
});

yargs.command(
  'pick',
  'Pick device token to prepare for sending notification',
  {
    all: {
      alias: 'a',
      boolean: true,
      desc: 'Pick all device tokens',
    },
    token: {
      alias: 't',
      array: true,
      string: true,
      desc: 'Pick device token by token value',
    },
    index: {
      alias: 'i',
      array: true,
      number: true,
      desc: 'Pick device token by token index',
    },
  },
  (args) => {
    try {
      const { all, index, token } = args;
      if (!all && !index && !token) throw new Error('Nothing to do!');

      logHandling();
      const pickedTokenCount = deviceHandler.pick(!!all, token, index);

      logSuccessHeading(`Picked ${chalk.red(pickedTokenCount)} tokens`);
    } catch (error) {
      errorHander(error);
    }
  }
);

yargs.command(
  'remove',
  'Remove token from picked list',
  {
    all: {
      alias: 'a',
      boolean: true,
      desc: 'Empty picked list',
    },
    token: {
      alias: 't',
      array: true,
      string: true,
      desc: 'Unpick device token by token value',
    },
    index: {
      alias: 'i',
      array: true,
      number: true,
      desc: 'Unpick device token by token index',
    },
  },
  (args) => {
    try {
      const { all, index, token } = args;
      if (!all && !index && !token) throw new Error('Nothing to do!');

      logHandling();
      const removedTokenCount = deviceHandler.remove(!!all, token, index);

      logSuccessHeading(
        `${chalk.red(
          removedTokenCount
        )} tokens have been removed from picked list`
      );
    } catch (error) {
      errorHander(error);
    }
  }
);

yargs.command('status', 'Show picked tokens', {}, (_) => {
  try {
    logHandling();
    const { pickedTokens } = deviceHandler.status();

    logSuccessHeading(
      `There has ${chalk.red(pickedTokens.length)} tokens have been picked`
    );
    pickedTokens.length && logTable(pickedTokens);
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
      string: true,
      requiresArg: true,
      desc: 'Drop device token by token value',
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
