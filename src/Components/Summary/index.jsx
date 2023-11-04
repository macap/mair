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
        <div>{flightsCount} flights total</div>
        <div>
          {price} {currency}
        </div>
        <div>{daysCount} days</div>
      </div>
    </div>
  );
}

export default Summary;
