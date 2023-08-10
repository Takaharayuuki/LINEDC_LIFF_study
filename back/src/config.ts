if (!process.env.LINE_CHANNEL_ID) {
  console.error('Specify LINE_CHANNEL_ID as environment variable.');
  process.exit(1);
}
if (!process.env.LINE_CHANNEL_SECRET) {
  console.error('Specify LINE_CHANNEL_SECRET as environment variable.');
  process.exit(1);
}
if (!process.env.LINE_CHANNEL_ACCESS_TOKEN) {
  console.error('Specify LINE_CHANNEL_ACCESS_TOKEN as environment variable.');
  process.exit(1);
}

export const config = {
  channelId: process.env.LINE_CHANNEL_ID,
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};
