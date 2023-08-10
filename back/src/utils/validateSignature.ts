import { validateSignature } from '@line/bot-sdk';
import crypto from 'crypto';
import { config } from '../config';

/**
 * LINE SDKを使って、signatureを検証する
 * @param body a request body string
 * @param signature a string of X-Line-Signature header
 * @returns
 */
export const validateSignatureSDK = (
  body: string,
  signature: string
): boolean => {
  return validateSignature(body, config.channelSecret, signature);
};

/**
 * signature生成
 * @param body a request body string
 * @returns
 */
export const generateSignature = (body: string): string => {
  // https://developers.line.biz/ja/reference/messaging-api/#signature-validation
  return crypto
    .createHmac('SHA256', config.channelSecret)
    .update(body)
    .digest('base64');
};

/**
 * 自前でsignatureを検証する
 * @param body a request body string
 * @param signature a string of X-Line-Signature header
 * @returns
 */
export const validateSignatureLocal = (
  body: string,
  signature: string
): boolean => {
  return signature === generateSignature(body);
};
