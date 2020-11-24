import { logError, logErrorHeading } from './log';

export default (error: any) => {
  logErrorHeading('Opps, we got an error');
  logError(error.message);
};
