import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { existsSync } from 'fs';
import { deviceDataFile } from '../configs';
import { readDeviceFileData } from './index';

const expo = new Expo();

const send = async (title: string, content: string) => {
  const error = new Error('Please pick device token before sending');
  if (!existsSync(deviceDataFile)) throw error;
  const { pickedTokens } = readDeviceFileData();
  if (!pickedTokens.length) throw error;

  const tokens = pickedTokens
    .map(({ token }) => token)
    .filter((token) => Expo.isExpoPushToken(token));
  const messages: ExpoPushMessage[] = tokens.map((token) => ({
    to: token,
    title,
    body: content,
  }));
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = await Promise.all(
    chunks.map((chunk) => expo.sendPushNotificationsAsync(chunk))
  );

  return tickets;
};

export default { send };
