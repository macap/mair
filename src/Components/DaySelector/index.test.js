import { useDaySelector } from ".";

const mockArrivalDate = new Date("2024-01-02T14:55:00");

describe("useDaySelector", () => {
  describe.todo("given dayOffset [0-3]", () => {
    it.each([0, 1, 2, 3])("returns next 3 days for %s offset", (offset) => {
      const { visibleOffset, displayDates } = useDaySelector(
        mockArrivalDate,
        offset
      );

      expect(visibleOffset).toEqual([1, 2, 3]);
      expect(displayDates.length).toEqual(3);
      expect(displayDates[0].toJSON()).toEqual("2024-01-02T00:00:00.000Z");
      expect(displayDates[1].toJSON()).toEqual("2024-01-02T00:00:00.000Z");
      expect(displayDates[2].toJSON()).toEqual("2024-01-02T00:00:00.000Z");
    });
  });
  describe("given offset 4+", () => {
    it.todo("returns next 4 days", () => {
      const mockOffset = 7;

      const { visibleOffset, displayDates } = useDaySelector(
        mockArrivalDate,
        mockOffset
      );

      expect(visibleOffset).toEqual([6, 7, 8, 9]);
      expect(displayDates.length).toEqual(4);
      expect(displayDates[0].toJSON()).toEqual("2024-01-02T00:00:00.000Z");
      expect(displayDates[1].toJSON()).toEqual("2024-01-02T00:00:00.000Z");
      expect(displayDates[2].toJSON()).toEqual("2024-01-02T00:00:00.000Z");
      expect(displayDates[4].toJSON()).toEqual("2024-01-02T00:00:00.000Z");
    });
  });
});
