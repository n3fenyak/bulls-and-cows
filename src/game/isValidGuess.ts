import { createDigitValidator } from './createDigitValidator';

export function isValidGuess(guess: string, length: number, base: number): boolean {
  if (guess.length !== length) {
    return false;
  }

  const digits = guess.toLowerCase().split('');
  const isValidDigit = createDigitValidator(base);

  const allDigitsValid = digits.every(isValidDigit);
  const allDigitsUnique = new Set(digits).size === digits.length;

  return allDigitsValid && allDigitsUnique;
}
