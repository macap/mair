import css from "./HomePage.module.scss";

function HomePage({ children }) {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>
        Your Low-Cost Multi-City adventure starts here!
      </h1>
      <p>
        Ditch the fixed routes. Embrace the freedom to design your trip, city by
        city, with budget-friendly options at every turn. Using Europe's
        low-cost airlines.
      </p>
      {children}
    </div>
  );
}

export default HomePage;
