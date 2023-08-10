import { validateSignature } from '@line/bot-sdk';
import crypto from 'crypto';

const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET || '';

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
  return validateSignature(body, LINE_CHANNEL_SECRET, signature);
};

/**
 * signature生成
 * @param body a request body string
 * @returns
 */
export const generateSignature = (body: string): string => {
  // https://developers.line.biz/ja/reference/messaging-api/#signature-validation
  return crypto
    .createHmac('SHA256', LINE_CHANNEL_SECRET)
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
