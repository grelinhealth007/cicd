import { expect, test } from "bun:test";
import { applyDiscount } from "./price";

test("10% off 200 is 180", () => {
  expect(applyDiscount(200, 10)).toBe(180);
});

test("the result is rounded to 2 decimal places", () => {
  expect(applyDiscount(19.99, 15)).toBe(16.99);
});

test("0% and 100% are allowed", () => {
  expect(applyDiscount(50, 0)).toBe(50);
  expect(applyDiscount(50, 100)).toBe(0);
});

test("a percent outside 0–100 is refused", () => {
  expect(() => applyDiscount(100, 150)).toThrow("percent must be between 0 and 100");
  expect(() => applyDiscount(100, -1)).toThrow();
});

test("a negative price is refused", () => {
  expect(() => applyDiscount(-5, 10)).toThrow("price must be a number of 0 or more");
});
