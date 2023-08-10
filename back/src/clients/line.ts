import { Client, ClientConfig } from '@line/bot-sdk';
import { config as appConfig } from '../config';

const config: ClientConfig = {
  channelAccessToken: appConfig.channelAccessToken,
  channelSecret: appConfig.channelSecret,
};
export const client = new Client(config);

export const pushMessage = async (userId: string, message: string) => {
  await client.pushMessage(userId, {
    type: 'text',
    text: message,
  });
};

export const replyMessage = async (replyToken: string, message: string) => {
  await client.replyMessage(replyToken, {
    type: 'text',
    text: message,
  });
};
