import { existsSync, writeFileSync, readFileSync } from 'fs';
import { getDeviceTokens } from '../services/notification';
import { ExpoToken } from '../types/device';
import { deviceDataFile } from '../configs';
import { createDataDir } from '../utils';

const fetch = async (): Promise<{ added: number; removed: number }> => {
  const tokens = await getDeviceTokens();
  let added = tokens.length;
  let removed = 0;
  createDataDir();

  if (existsSync(deviceDataFile)) {
    const fileContent = readFileSync(deviceDataFile).toString();
    const storedTokens: ExpoToken[] = fileContent
      ? JSON.parse(fileContent)
      : [];
    const intersection = tokens.filter((token) =>
      storedTokens.find(
        (storedToken) =>
          token.token === storedToken.token && token.id === storedToken.id
      )
    );
    added = tokens.length - intersection.length;
    removed = storedTokens.length - intersection.length;
  }

  writeFileSync(deviceDataFile, JSON.stringify(tokens));
  return { added, removed };
};

export default { fetch };
