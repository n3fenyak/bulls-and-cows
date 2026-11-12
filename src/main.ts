import { generateSecret } from './game/generateSecret';
import { evaluateGuess } from './game/evaluateGuess';
import { isValidGuess } from './game/isValidGuess';

const title = document.createElement('h1');
title.textContent = 'Быки и коровы';

const description = document.createElement('p');
description.textContent = 'Угадай секретную комбинацию без повторяющихся цифр.';

const baseLabel = document.createElement('label');
baseLabel.textContent = 'Система счисления: ';

const baseSelect = document.createElement('select');

const bases = [
  { value: 2, label: 'Двоичная (2)' },
  { value: 8, label: 'Восьмеричная (8)' },
  { value: 10, label: 'Десятичная (10)' },
  { value: 16, label: 'Шестнадцатеричная (16)' },
];

bases.forEach(({ value, label }) => {
  const option = document.createElement('option');

  option.value = String(value);
  option.textContent = label;

  if (value === 10) {
    option.selected = true;
  }

  baseSelect.append(option);
});

baseLabel.append(baseSelect);

const lengthLabel = document.createElement('label');
lengthLabel.textContent = 'Длина комбинации: ';

const lengthSelect = document.createElement('select');

for (let length = 2; length <= 6; length++) {
  const option = document.createElement('option');

  option.value = String(length);
  option.textContent = String(length);

  if (length === 4) {
    option.selected = true;
  }

  lengthSelect.append(option);
}

lengthLabel.append(lengthSelect);
function updateLengthOptions(): void {
  const selectedBase = Number(baseSelect.value);

  const maxLength = Math.min(6, selectedBase);

  lengthSelect.replaceChildren();

  for (let length = 2; length <= maxLength; length++) {
    const option = document.createElement('option');

    option.value = String(length);
    option.textContent = String(length);

    lengthSelect.append(option);
  }

  lengthSelect.value = String(Math.min(4, maxLength));
}

baseSelect.addEventListener('change', updateLengthOptions);

const startButton = document.createElement('button');
startButton.textContent = 'Начать игру';

document.body.append(title, description, baseLabel, lengthLabel, startButton);
const gameScreen = document.createElement('section');
gameScreen.hidden = true;

const gameTitle = document.createElement('h2');
gameTitle.textContent = 'Игра началась!';

const gameInfo = document.createElement('p');

const guessLabel = document.createElement('label');
guessLabel.textContent = 'Твоя комбинация: ';

const guessInput = document.createElement('input');
guessInput.type = 'text';
guessInput.autocomplete = 'off';
guessInput.spellcheck = false;

guessLabel.append(guessInput);

const checkButton = document.createElement('button');
checkButton.textContent = 'Проверить';

const gameMessage = document.createElement('p');

gameScreen.append(gameTitle, gameInfo, guessLabel, checkButton, gameMessage);

document.body.append(gameScreen);
let secret = '';

startButton.addEventListener('click', () => {
  const base = Number(baseSelect.value);
  const length = Number(lengthSelect.value);

  secret = generateSecret(length, base);

  title.hidden = true;
  description.hidden = true;
  baseLabel.hidden = true;
  lengthLabel.hidden = true;
  startButton.hidden = true;

  gameScreen.hidden = false;

  gameInfo.textContent = `Система счисления: ${base}. Длина комбинации: ${length}.`;

  guessInput.maxLength = length;
  guessInput.value = '';
  gameMessage.textContent = '';

  guessInput.focus();
});
checkButton.addEventListener('click', () => {
  const guess = guessInput.value;
  const base = Number(baseSelect.value);
  const length = Number(lengthSelect.value);

  if (!isValidGuess(guess, length, base)) {
    gameMessage.textContent = 'Некорректная комбинация. Проверь длину, цифры и повторения.';
    return;
  }

  const result = evaluateGuess(secret, guess);

  gameMessage.textContent = `Быки: ${result.bulls}, коровы: ${result.cows}`;
});
