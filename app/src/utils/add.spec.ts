import { add } from "./add";

describe("add()", () => {
  test("두 양수를 더하면 올바른 결과를 반환해야 한다", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("음수와 양수를 더하면 올바른 결과를 반환해야 한다", () => {
    expect(add(-2, 3)).toBe(1);
  });

  test("두 음수를 더하면 올바른 결과를 반환해야 한다", () => {
    expect(add(-2, -3)).toBe(-5);
  });

  test("0을 포함한 덧셈이 올바르게 동작해야 한다", () => {
    expect(add(0, 5)).toBe(5);
    expect(add(5, 0)).toBe(5);
    expect(add(0, 0)).toBe(0);
  });
});
