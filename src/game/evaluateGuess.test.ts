import { describe, expect, it } from 'vitest';
import { evaluateGuess } from './evaluateGuess';

describe('evaluateGuess', () => {
  it('counts bulls when digits match in the same positions', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({
      bulls: 4,
      cows: 0,
    });
  });

  it('counts cows when digits match in different positions', () => {
    expect(evaluateGuess('1234', '4321')).toEqual({
      bulls: 0,
      cows: 4,
    });
  });

  it('counts bulls and cows together', () => {
    expect(evaluateGuess('1234', '1542')).toEqual({
      bulls: 1,
      cows: 2,
    });
  });

  it('returns zero when no digits match', () => {
    expect(evaluateGuess('1234', '5678')).toEqual({
      bulls: 0,
      cows: 0,
    });
  });

  it('compares hexadecimal digits case-insensitively', () => {
    expect(evaluateGuess('a1bc', 'A1CB')).toEqual({
      bulls: 2,
      cows: 2,
    });
  });
});
