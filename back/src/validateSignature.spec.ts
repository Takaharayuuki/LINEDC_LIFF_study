import {
  generateSignature,
  validateSignatureLocal,
  validateSignatureSDK,
} from './validateSignature';

describe('validateSignature', () => {
  test(validateSignatureSDK.name, () => {
    const body = 'body';
    const signature = 'zhLe7JlEHT/G2bPlQU0oBlStpn0IAnJC0uPh6c4xzXI=';
    const result = validateSignatureSDK(body, signature);
    expect(result).toBe(true);
  });

  test('generateSignature', () => {
    const body = 'body';
    const result = generateSignature(body);
    expect(result).toBe('zhLe7JlEHT/G2bPlQU0oBlStpn0IAnJC0uPh6c4xzXI=');
  });

  test('validateSignatureLocal', () => {
    const body = 'body';
    const signature = 'zhLe7JlEHT/G2bPlQU0oBlStpn0IAnJC0uPh6c4xzXI=';
    const result = validateSignatureLocal(body, signature);
    expect(result).toBe(true);
  });
});
