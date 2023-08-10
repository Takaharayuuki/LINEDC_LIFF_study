import { Client, ClientConfig } from '@line/bot-sdk';
import { config as appConfig } from '../config';

const config: ClientConfig = {
  channelAccessToken: appConfig.channelAccessToken,
  channelSecret: appConfig.channelSecret,
};
export const client = new Client(config);
