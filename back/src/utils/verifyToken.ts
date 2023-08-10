import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { config } from '../config';

/**
 * LINEが提供しているAPIを使って、idTokenを検証する
 * @param idToken a string of idToken
 * @returns
 */
export const verifyTokenAPI = async (idToken: string): Promise<string> => {
  const params = new URLSearchParams();
  params.append('id_token', idToken);
  params.append('client_id', config.channelId);
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

/**
 * jwt-decodeを使って、idTokenを検証する
 * @param idToken a string of idToken
 * @returns
 */
export const verifyTokenLocal = async (idToken: string): Promise<string> => {
  const decoded = jwt_decode<{ sub: string; aud: string }>(idToken);
  console.log(decoded);
  if (decoded.aud !== config.channelId) {
    return '';
  }
  return decoded.sub;
};
