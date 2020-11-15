import { mkdirSync, existsSync } from 'fs';
import { appDataDir } from '../configs';

export const createDataDir = () => {
  if (!existsSync(appDataDir)) {
    mkdirSync(appDataDir);
  }
};
