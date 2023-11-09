import css from "./Summary.module.scss";

function Summary({
  price,
  priceInfo,
  currency,
  startDate,
  endDate,
  daysCount,
  flightsCount,
  onClick,
}) {
  return (
    <div className={css.summary}>
      <div className={css.inner}>
        <div>
          {flightsCount} flights in {daysCount} days
        </div>
        <div className={css.price}>{price ? `~${price}` : priceInfo}</div>
        {price && <div className={css.tooltip}>({priceInfo})</div>}
      </div>
      {/* <a className={css.link}>View details</a> */}
      <button className={css.button} onClick={onClick}>
        Book flights
      </button>
    </div>
  );
}

export default Summary;
