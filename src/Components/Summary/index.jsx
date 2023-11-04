import css from "./Summary.module.scss";

function Summary({
  price,
  currency,
  startDate,
  endDate,
  daysCount,
  flightsCount,
}) {
  return (
    <div className={css.summary}>
      <div className={css.inner}>
        <div>
          {flightsCount} flights in {daysCount} days
        </div>
        <div className={css.price}>
          {price} {currency}
        </div>
      </div>
      <a className={css.link}>View details</a>
      <button className={css.button}>Call to action</button>
    </div>
  );
}

export default Summary;
