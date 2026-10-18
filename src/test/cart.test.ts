import { describe, expect, it } from "vitest";
import { cartSubtotal } from "@/lib/cart";

describe("cart totals", () => {
  it("multiplies price by quantity and sums lines", () => {
    expect(cartSubtotal([{ price: 799, qty: 2 }, { price: 299, qty: 1 }])).toBe(1897);
  });
});
