import { existsSync } from 'fs';
import { getDeviceTokens } from '../services/notification';
import { ExpoToken } from '../types/device';
import { deviceDataFile } from '../configs';
import { createDataDir } from '../utils';
import { readDeviceFileData, writeDeviceFileData } from './index';

const validateNotExist = (
  tokenValues?: string[],
  tokenIndexes?: number[]
): void => {
  if (!existsSync(deviceDataFile)) {
    throw new Error('The list is empty, please fetch');
  }

  const { tokens } = readDeviceFileData();
  if (tokenValues && tokenValues.length) {
    const notExistTokens = tokenValues.filter(
      (tokenValue) => !tokens.find(({ token }) => token === tokenValue)
    );
    if (notExistTokens.length) {
      throw new Error(
        `These tokens are not exist: ${notExistTokens.join(' ')}`
      );
    }
  }
  if (tokenIndexes && tokenIndexes.length) {
    const notExistIndexes = tokenIndexes.filter(
      (tokenIndex) => tokenIndex < 0 || tokenIndex >= tokens.length
    );
    if (notExistIndexes.length) {
      throw new Error(
        `These indexes are not exist: ${notExistIndexes.join(', ')}`
      );
    }
  }
};

const fetch = async (): Promise<{ added: number; removed: number }> => {
  let newTokens = await getDeviceTokens();
  let pickedTokens: ExpoToken[] = [];
  let added = newTokens.length;
  let removed = 0;
  createDataDir();

  if (existsSync(deviceDataFile)) {
    const fileData = readDeviceFileData();
    const intersection = newTokens.filter(({ token, id }) =>
      fileData.tokens.find(
        (storedToken) => token === storedToken.token && id === storedToken.id
      )
    );
    added = newTokens.length - intersection.length;
    removed = fileData.tokens.length - intersection.length;
    pickedTokens = fileData.pickedTokens;
  }

  writeDeviceFileData(newTokens, pickedTokens);
  return { added, removed };
};

const list = (): { tokens: ExpoToken[] } => {
  if (!existsSync(deviceDataFile)) return { tokens: [] };

  const { tokens } = readDeviceFileData();

  return { tokens };
};

const pick = (
  isAll: boolean,
  pickTokenValues?: string[],
  pickTokenIndexes?: number[]
): number => {
  validateNotExist(pickTokenValues, pickTokenIndexes);
  const fileData = readDeviceFileData();

  if (isAll) {
    const notYetPickedTokens = fileData.tokens.filter(
      ({ token, id }) =>
        !fileData.pickedTokens.find(
          (pickedToken) => pickedToken.token === token && pickedToken.id === id
        )
    );
    writeDeviceFileData(fileData.tokens, [
      ...fileData.pickedTokens,
      ...notYetPickedTokens,
    ]);
    return notYetPickedTokens.length;
  }

  const tokenWillBePicked = fileData.tokens.filter(({ token, id }, index) => {
    const isChoosen =
      (pickTokenIndexes && pickTokenIndexes.includes(index)) ||
      (pickTokenValues && pickTokenValues.includes(token));
    const isPicked = fileData.pickedTokens.find(
      (pickedToken) => pickedToken.token === token && pickedToken.id === id
    );
    return isChoosen && !isPicked;
  });
  writeDeviceFileData(fileData.tokens, [
    ...fileData.pickedTokens,
    ...tokenWillBePicked,
  ]);
  return tokenWillBePicked.length;
};

const remove = (
  isAll: boolean,
  removeTokenValues?: string[],
  removeTokenIndexes?: number[]
): number => {
  validateNotExist(removeTokenValues, removeTokenIndexes);
  const { tokens, pickedTokens } = readDeviceFileData();

  if (isAll) {
    writeDeviceFileData(tokens, []);
    return pickedTokens.length;
  }

  const remainPickedTokens = pickedTokens.filter(({ token }, index) => {
    const isChoosen =
      (removeTokenIndexes && removeTokenIndexes.includes(index)) ||
      (removeTokenValues && removeTokenValues.includes(token));
    return !isChoosen;
  });
  writeDeviceFileData(tokens, remainPickedTokens);
  return pickedTokens.length - remainPickedTokens.length;
};

const status = (): { pickedTokens: ExpoToken[] } => {
  if (!existsSync(deviceDataFile)) return { pickedTokens: [] };

  const { pickedTokens } = readDeviceFileData();

  return { pickedTokens };
};

export default { fetch, list, pick, remove, status };
