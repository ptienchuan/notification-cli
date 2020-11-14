import axios from 'axios';

const NotificationService = axios.create({
  baseURL: 'https://expo-notification-6e7a2.firebaseio.com',
});

interface ExpoToken {
  id: string;
  token: string;
}

const getDeviceTokens = async (): Promise<ExpoToken[]> => {
  const { data } = await NotificationService.get('/expoTokens.json');
  if (!data) return [];

  const tokens: ExpoToken[] = Object.keys(data).map((id: string) => ({
    id,
    token: data[id].token,
  }));

  return tokens;
};

const dropDeviceTokens = async (
  dropTokenParameters: string[]
): Promise<string[]> => {
  const tokens = await getDeviceTokens();
  const { notExistTokens, dropTokens } = dropTokenParameters.reduce(
    (accumulator, currentValue) => {
      const tokenIndex = tokens.findIndex(
        ({ token }) => token === currentValue
      );
      if (tokenIndex === -1) {
        accumulator.notExistTokens = accumulator.notExistTokens.concat(
          currentValue
        );
      } else {
        accumulator.dropTokens = accumulator.dropTokens.concat(
          tokens[tokenIndex]
        );
      }
      return accumulator;
    },
    {
      notExistTokens: [] as string[],
      dropTokens: [] as ExpoToken[],
    }
  );
  if (notExistTokens.length) {
    throw new Error(`These tokens are not exist: ${notExistTokens.join(' ')}`);
  }
  await Promise.all(
    dropTokens.map(({ id }) => {
      NotificationService.delete(`/expoTokens/${id}.json`);
    })
  );

  return dropTokens.map(({ token }) => token);
};

export { getDeviceTokens, dropDeviceTokens };
