import { type, equals, not, pipe } from 'ramda';

export const round = (price: number, digit: number = 0): number => {
  const isNumber = pipe(type, equals('Number'));
  if (not(isNumber(price))) throw 'The type of price should equal to number';

  const isFloat = (n: number) => n % 1 !== 0;
  if (isFloat(price)) return +price.toFixed(digit);

  const roundNumber = 10 ** digit;
  return Math.round(price / roundNumber) * roundNumber;
};
