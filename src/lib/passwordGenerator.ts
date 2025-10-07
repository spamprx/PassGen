export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
// const SIMILAR_CHARS = '0O1lI'; // Reserved for future use

export function generatePassword(options: PasswordOptions): string {
  let charset = '';
  
  if (options.includeUppercase) {
    charset += options.excludeSimilar ? UPPERCASE.replace(/[0O1lI]/g, '') : UPPERCASE;
  }
  
  if (options.includeLowercase) {
    charset += options.includeLowercase ? LOWERCASE.replace(/[0O1lI]/g, '') : LOWERCASE;
  }
  
  if (options.includeNumbers) {
    charset += options.excludeSimilar ? NUMBERS.replace(/[0O1lI]/g, '') : NUMBERS;
  }
  
  if (options.includeSymbols) {
    charset += SYMBOLS;
  }

  if (charset.length === 0) {
    throw new Error('At least one character type must be selected');
  }

  let password = '';
  for (let i = 0; i < options.length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  
  // Length scoring
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  // Character variety scoring
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  
  // Pattern penalties
  if (/(.)\1{2,}/.test(password)) score -= 1; // Repeated characters
  if (/123|abc|qwe/i.test(password)) score -= 1; // Common patterns
  
  const strengthLevels = [
    { label: 'Very Weak', color: 'text-red-500' },
    { label: 'Weak', color: 'text-orange-500' },
    { label: 'Fair', color: 'text-yellow-500' },
    { label: 'Good', color: 'text-blue-500' },
    { label: 'Strong', color: 'text-green-500' },
  ];
  
  const level = Math.min(Math.max(score, 0), strengthLevels.length - 1);
  
  return {
    score: level,
    label: strengthLevels[level].label,
    color: strengthLevels[level].color,
  };
}
