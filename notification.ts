import yargs from 'yargs';
import { logHandling, logSuccessHeading } from './utils/log';
import errorHander from './utils/error-handler';
import notificationHandler from './handlers/notification';

yargs
  .command(
    'send',
    'Send notification to the picked devices',
    {
      title: {
        alias: 't',
        string: true,
        requiresArg: true,
        desc: 'The title of notification',
      },
      content: {
        alias: 'c',
        string: true,
        requiresArg: true,
        desc: 'The content of notification',
      },
    },
    async (args) => {
      try {
        const { title, content } = args;
        if (!title || !content) throw new Error('Nothing to do');

        logHandling();
        notificationHandler.send(title, content);

        logSuccessHeading('The notification has been sent');
      } catch (error) {
        errorHander(error);
      }
    }
  )
  .check((args) => {
    const title = args.title as string;
    if (title.length > 50) {
      throw new Error('Title is too long');
    }
    const content = args.content as string;
    if (content.length > 100) {
      throw new Error('Content is too long');
    }

    return true;
  });

yargs.parse();
