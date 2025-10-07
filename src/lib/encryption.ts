export async function deriveKey(password: string, salt: string): Promise<string> {
  const CryptoJS = await import('crypto-js');
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 256/32,
    iterations: 10000
  }).toString();
}

// Encrypt data using AES
export async function encrypt(data: string, key: string): Promise<string> {
  const CryptoJS = await import('crypto-js');
  return CryptoJS.AES.encrypt(data, key).toString();
}

// Decrypt data using AES
export async function decrypt(encryptedData: string, key: string): Promise<string> {
  const CryptoJS = await import('crypto-js');
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Generate a random salt
export async function generateSalt(): Promise<string> {
  const CryptoJS = await import('crypto-js');
  return CryptoJS.lib.WordArray.random(128/8).toString();
}

// Hash password for storage
export async function hashPassword(password: string): Promise<string> {
  const CryptoJS = await import('crypto-js');
  return CryptoJS.SHA256(password).toString();
}
