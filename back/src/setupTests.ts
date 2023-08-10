export default (): void => {
  process.env.LINE_CHANNEL_ID = 'TEST_LINE_CHANNEL_ID';
  process.env.LINE_CHANNEL_SECRET = 'TEST_LINE_CHANNEL_SECRET';
  process.env.LINE_CHANNEL_ACCESS_TOKEN = 'TEST_LINE_CHANNEL_ACCESS_TOKEN';
  return;
};
