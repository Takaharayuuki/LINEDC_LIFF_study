import axios from 'axios';

const LINE_CHANNEL_ID = process.env.LINE_CHANNEL_ID || '';

/**
 * LINEが提供しているAPIを使って、idTokenを検証する
 * @param idToken
 * @returns
 */
export const verifyTokenAPI = async (idToken: string): Promise<string> => {
  const params = new URLSearchParams();
  params.append('id_token', idToken);
  params.append('client_id', LINE_CHANNEL_ID);
  return await axios
    .post('https://api.line.me/oauth2/v2.1/verify', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((res) => {
      console.log(res.data);
      // https://developers.line.biz/ja/reference/line-login/#verify-id-token-response
      return res.data.sub;
    })
    .catch((err) => {
      console.error(err);
      return '';
    });
};
