import { client } from './clients/line';

export const pushMessage = async (userId: string, message: string) => {
  await client.pushMessage(userId, {
    type: 'text',
    text: message,
  });
};
