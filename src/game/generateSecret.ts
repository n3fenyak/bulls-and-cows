export function generateSecret(
  length: number,
  base: number,
  random: () => number = Math.random,
): string {
  const digits = '0123456789abcdef'.slice(0, base).split('');

  let secret = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(random() * digits.length);

    const selectedDigit = digits.splice(randomIndex, 1)[0];

    secret += selectedDigit;
  }

  return secret;
}
