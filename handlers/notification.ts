import { existsSync } from 'fs';
import { deviceDataFile } from '../configs';
import { readDeviceFileData } from './index';

const send = (title: string, content: string): boolean => {
  const error = new Error('Please pick device token before sending');
  if (!existsSync(deviceDataFile)) throw error;
  const { pickedTokens } = readDeviceFileData();
  if (!pickedTokens.length) throw error;

  // TODO send notification handling

  return true;
};

export default { send };
