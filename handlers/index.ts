import { writeFileSync, readFileSync } from 'fs';
import { ExpoToken, DeviceFileData } from '../types/device';
import { deviceDataFile } from '../configs';

const readDeviceFileData = (): DeviceFileData => {
  const fileContent = readFileSync(deviceDataFile).toString();
  const fileData: DeviceFileData = fileContent
    ? JSON.parse(fileContent)
    : { tokens: [], pickedTokens: [] };

  return fileData;
};

const writeDeviceFileData = (
  tokens: ExpoToken[],
  pickedTokens: ExpoToken[]
): void => {
  const fileData: DeviceFileData = {
    tokens,
    pickedTokens,
  };
  writeFileSync(deviceDataFile, JSON.stringify(fileData));
};

export { readDeviceFileData, writeDeviceFileData };
