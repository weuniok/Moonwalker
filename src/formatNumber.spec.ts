import { describe, expect, it } from "vitest";

import { formatNumber } from "./formatNumber";

describe(formatNumber.name, () => {
  it("formats big numbers with one digit after dot", () => {
    expect(formatNumber(525)).toBe("525.0");
    expect(formatNumber(900.0001234)).toBe("900.0");
  });

  it("formats small numbers showing 2 significant digits", () => {
    expect(formatNumber(0.00001962)).toBe("0.000020");
  });
});
