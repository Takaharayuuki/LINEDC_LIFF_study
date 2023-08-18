import { verifyTokenAPI, verifyTokenLocal } from './verifyToken';

// generated with https://jwt.io/
const idToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY2Vzcy5saW5lLm1lIiwic3ViIjoiVTEyMzQ1Njc4OTBhYmNkZWYxMjM0NTY3ODkwYWJjZGVmIiwiYXVkIjoiVEVTVF9MSU5FX0NIQU5ORUxfSUQiLCJleHAiOjE1MDQxNjkwOTIsImlhdCI6MTUwNDI2MzY1Nywibm9uY2UiOiIwOTg3NjU0YXNkZiIsImFtciI6WyJwd2QiXSwibmFtZSI6IlRhcm8gTGluZSIsInBpY3R1cmUiOiJodHRwczovL3NhbXBsZV9saW5lLm1lL2FCY2RlZmcxMjM0NTYiLCJlbWFpbCI6InRhcm8ubGluZUBleGFtcGxlLmNvbSJ9._w-afXk2r8CDRnEScrVMATFswQeEoQ_LmehlVA4Hosc';

jest.mock('axios', () => ({
  post: jest.fn(() =>
    Promise.resolve({ data: { sub: 'U1234567890abcdef1234567890abcdef' } })
  ),
}));
describe('verifyToken', () => {
  test(verifyTokenAPI.name, async () => {
    const result = await verifyTokenAPI(idToken);
    expect(result).toBe('U1234567890abcdef1234567890abcdef');
  });

  test(verifyTokenLocal.name, async () => {
    const result = await verifyTokenLocal(idToken);
    expect(result).toBe('U1234567890abcdef1234567890abcdef');
  });
});
