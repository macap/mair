import { useQuery } from "@tanstack/react-query";
import useCurrencyConverter from "./useCurrencyConverter";
import { beforeEach } from "vitest";

const mockCurrencyRates = [{ code: "EUR", mid: 4.2 }];

vitest.mock("@tanstack/react-query", () => ({
  useQuery: vitest.fn(),
}));

describe("useCurrencyConverter", () => {
  describe("with valid rates data", () => {
    beforeEach(() => {
      useQuery.mockReturnValue({
        isPending: false,
        error: null,
        data: mockCurrencyRates,
        isFetching: false,
      });
    });
    it("given multiple values in PLN returns the sum of given values", () => {
      const mockValues = [
        { value: 1.23, currencyCode: "PLN" },
        { value: 1.0, currencyCode: "PLN" },
      ];
      const res = useCurrencyConverter(mockValues);

      expect(res).toEqual("2.23 PLN");
    });
    it("given values in PLN and EUR returns total value in PLN", () => {
      const mockValues = [
        {
          value: 1.23,
          currencyCode: "PLN",
        },
        {
          value: 1.0,
          currencyCode: "EUR",
        },
      ];

      const res = useCurrencyConverter(mockValues);

      expect(res).toEqual("5.43 PLN");
    });
  });
  describe("with pending|failed rates request", () => {
    it("for pending request returns null", () => {
      useQuery.mockReturnValue({
        isPending: true,
        error: false,
        data: [],
        isFetching: true,
      });
      expect(useCurrencyConverter([{}])).toEqual(null);
    });
    it("for failed request returns null", () => {
      useQuery.mockReturnValue({
        isPending: false,
        error: true,
        data: [],
        isFetching: false,
      });
      expect(useCurrencyConverter([{}])).toEqual(null);
    });
  });
  describe("with invalid currency data", () => {
    it("returns null", () => {
      useQuery.mockReturnValue({
        isPending: false,
        error: false,
        data: [],
        isFetching: false,
      });

      expect(
        useCurrencyConverter([
          {
            value: 1.23,
            currencyCode: "PLN",
          },
          {
            value: 1.0,
            currencyCode: "EUR",
          },
        ])
      ).toEqual(null);
    });
  });
});
