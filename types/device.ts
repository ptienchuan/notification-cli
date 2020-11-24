export interface ExpoToken {
  id: string;
  token: string;
}

export interface DeviceFileData {
  tokens: ExpoToken[];
  pickedTokens: ExpoToken[];
}
