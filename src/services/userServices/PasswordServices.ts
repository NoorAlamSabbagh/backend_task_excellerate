import * as crypto from 'crypto';

export class PasswordServices {
  // Hash password with PBKDF2
  static hashPassword(password: string): { hash: string; salt: string } {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return { hash, salt };
  }

  // Verify hashed password
  static verifyPassword(plainPassword: string, salt: string, hash: string): boolean {
    const newHash = crypto.pbkdf2Sync(plainPassword, salt, 100000, 64, 'sha512').toString('hex');
    return newHash === hash;
  }
}

