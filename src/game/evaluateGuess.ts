export function evaluateGuess(secret: string, guess: string): { bulls: number; cows: number } {
  const secretDigits = secret.toLowerCase().split('');
  const guessDigits = guess.toLowerCase().split('');

  const bulls = guessDigits.filter((digit, index) => digit === secretDigits[index]).length;

  const matches = guessDigits.filter((digit) => secretDigits.includes(digit)).length;

  const cows = matches - bulls;

  return { bulls, cows };
}
