import axios from 'axios';

const NotificationService = axios.create({
  baseURL: 'https://expo-notification-6e7a2.firebaseio.com',
});

interface ExpoToken {
  id: string;
  token: string;
}

const getDeviceTokens = async () => {
  const { data } = await NotificationService.get('/expoTokens.json');
  const tokens: ExpoToken[] = Object.keys(data).map((id: string) => ({
    id,
    token: data[id].token,
  }));

  return tokens;
};

export { getDeviceTokens };
