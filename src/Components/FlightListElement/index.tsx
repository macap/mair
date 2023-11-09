import cx from "classnames";
import css from "./FlightListElement.module.scss";

interface FlightListElementProps {
  departureDate: String;
  departureTime: String;
  departureAirportName: String;
  departureAirportCode: String;
  departureCountryName: String;
  arrivalDate: String;
  arrivalTime: String;
  arrivalAirportName: String;
  arrivalAirportCode: String;
  arrivalCountryName: String;
  duration?: String;
  number?: String;
  priceValue: Number;
  currencySymbol: String;
  isDisabled?: boolean;
  withDate?: boolean;
  onClick?: () => void;
}

const FlightListElement = (f: FlightListElementProps): JSX.Element => (
  <div
    className={cx(css.element, {
      [css.disabled]: f.isDisabled,
      [css.clickable]: !!f.onClick,
    })}
    onClick={f.onClick}
  >
    <div className={css.left}>
      {f.withDate && <div className={css.date}>{f.departureDate}</div>}
      <div className={css.airport}>
        <div className={css.time}>{f.departureTime}</div>
        <div className={css.airportName}>
          {f.departureAirportName} ({f.departureAirportCode}),{" "}
          {f.departureCountryName}{" "}
        </div>
      </div>
      <div className={css.connection}>
        <div className={css.flightName}>{f.number}</div>
        <div className={css.duration}>{f.duration}</div>
      </div>
      <div className={css.airport}>
        <div className={css.time}>{f.arrivalTime}</div>
        <div className={css.airportName}>
          {f.arrivalAirportName} ({f.arrivalAirportCode}),{" "}
          {f.arrivalCountryName}
        </div>
      </div>
    </div>
    <div className={css.right}>
      <div className={css.price}>{`${f.priceValue} ${f.currencySymbol}`}</div>
    </div>
  </div>
);

export default FlightListElement;
