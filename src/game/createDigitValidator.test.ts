import { describe, expect, it } from 'vitest';
import { createDigitValidator } from './createDigitValidator';

describe('createDigitValidator', () => {
  it('accepts binary digits', () => {
    const isValid = createDigitValidator(2);

    expect(isValid('0')).toBe(true);
    expect(isValid('1')).toBe(true);
    expect(isValid('2')).toBe(false);
  });

  it('accepts octal digits', () => {
    const isValid = createDigitValidator(8);

    expect(isValid('7')).toBe(true);
    expect(isValid('8')).toBe(false);
  });

  it('accepts decimal digits', () => {
    const isValid = createDigitValidator(10);

    expect(isValid('9')).toBe(true);
    expect(isValid('a')).toBe(false);
  });

  it('accepts hexadecimal digits case-insensitively', () => {
    const isValid = createDigitValidator(16);

    expect(isValid('a')).toBe(true);
    expect(isValid('F')).toBe(true);
    expect(isValid('g')).toBe(false);
  });

  it('rejects empty strings and multiple characters', () => {
    const isValid = createDigitValidator(16);

    expect(isValid('')).toBe(false);
    expect(isValid('12')).toBe(false);
    expect(isValid('ab')).toBe(false);
  });

  it('rejects special characters', () => {
    const isValid = createDigitValidator(10);

    expect(isValid('-')).toBe(false);
    expect(isValid(' ')).toBe(false);
    expect(isValid('.')).toBe(false);
  });
});
