import { describe, expect, it } from 'vitest';
import { generateSecret } from './generateSecret';

describe('generateSecret', () => {
  it('generates a secret with the requested length', () => {
    const secret = generateSecret(4, 10);

    expect(secret).toHaveLength(4);
  });

  it('generates unique digits', () => {
    const secret = generateSecret(6, 10);

    const uniqueDigits = new Set(secret);

    expect(uniqueDigits.size).toBe(6);
  });

  it('generates digits within the specified base', () => {
    const binarySecret = generateSecret(2, 2);
    const octalSecret = generateSecret(4, 8);
    const decimalSecret = generateSecret(4, 10);
    const hexSecret = generateSecret(6, 16);

    expect(binarySecret).toMatch(/^[01]{2}$/);
    expect(octalSecret).toMatch(/^[0-7]{4}$/);
    expect(decimalSecret).toMatch(/^[0-9]{4}$/);
    expect(hexSecret).toMatch(/^[0-9a-f]{6}$/i);
  });

  it('allows a leading zero', () => {
    const random = () => 0;

    const secret = generateSecret(4, 10, random);

    expect(secret[0]).toBe('0');
  });

  it('uses the provided random function', () => {
    const random = () => 0;

    const firstSecret = generateSecret(4, 10, random);
    const secondSecret = generateSecret(4, 10, random);

    expect(firstSecret).toBe(secondSecret);
    expect(firstSecret).toHaveLength(4);
  });
});
