import { describe, expect, it } from 'vitest';
import { countPossibleSecrets } from './countPossibleSecrets';

describe('countPossibleSecrets', () => {
  it('counts binary combinations', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  it('counts octal combinations', () => {
    expect(countPossibleSecrets(2, 8)).toBe(56);
  });

  it('counts decimal combinations', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });

  it('counts hexadecimal combinations', () => {
    expect(countPossibleSecrets(4, 16)).toBe(43680);
  });

  it('counts combinations of maximum length', () => {
    expect(countPossibleSecrets(6, 16)).toBe(5765760);
  });

  it('returns zero when length exceeds base', () => {
    expect(countPossibleSecrets(3, 2)).toBe(0);
  });

  it('returns zero for negative length', () => {
    expect(countPossibleSecrets(-1, 10)).toBe(0);
  });

  it('returns one for zero length', () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
  });

  it('returns the same result on repeated calls', () => {
    const first = countPossibleSecrets(4, 10);
    const second = countPossibleSecrets(4, 10);

    expect(first).toBe(5040);
    expect(second).toBe(first);
  });
});
