// The business rule the tests check: a price after a percentage discount,
// rounded to 2 decimal places.

export function applyDiscount(price: number, percent: number): number {
  if (!Number.isFinite(price) || price < 0) throw new Error("price must be a number of 0 or more");
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
    throw new Error("percent must be between 0 and 100");
  }
  return Math.round(price * (100 - percent)) / 100;
}
