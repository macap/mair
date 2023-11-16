import { format, add, setHours, setMinutes, isEqual } from "date-fns";
import cx from "classnames";
import css from "./DaySelector.module.scss";

function DaySelector({ arrivalDate, currentDate, dayOffset, setDayOffset }) {
  const visibleOffset =
    dayOffset < 4
      ? [1, 2, 3]
      : [dayOffset - 1, dayOffset, dayOffset + 1, dayOffset + 2];
  const displayDates = visibleOffset.map((inc) =>
    setHours(setMinutes(add(arrivalDate, { days: inc }), 0), 0)
  );

  return (
    <div className={css.dateForm}>
      <button
        disabled={dayOffset === 0}
        onClick={() => setDayOffset((d) => d - 1)}
        title="Shorten your stay here by 1 day"
        className={css.button}
      >
        ◀︎
      </button>
      {dayOffset < 4 && (
        <div
          className={cx(css.dateItem, {
            [css.dateItemActive]: dayOffset === 0,
          })}
        >
          <div className={css.dateDiff}>arrival day</div>
          <div className={css.date}>{format(arrivalDate, "dd MMM")}</div>
          <div className={css.day}>{format(arrivalDate, "EEEE")}</div>
          <div className={css.time}>{format(arrivalDate, "HH:mm")}</div>
        </div>
      )}

      {displayDates.map((date, i) => (
        <div
          className={cx(css.dateItem, {
            [css.dateItemActive]: isEqual(date, currentDate),
          })}
        >
          <div className={css.dateDiff}>+ {visibleOffset[i]} days</div>
          <div className={css.date}>{format(date, "dd MMM")}</div>
          <div className={css.day}>{format(date, "EEEE")}</div>
          <div className={css.time}>{format(date, "HH:mm")}</div>
        </div>
      ))}

      <button
        onClick={() => setDayOffset((d) => d + 1)}
        title="Stay here for 1 more day "
        className={css.button}
      >
        ▶︎
      </button>
    </div>
  );
}

export default DaySelector;
