import cx from "classnames";
import css from "./HomePage.module.scss";
import bg from "../../../public/header_bg.svg";

import frame5 from "../../../public/Frame5.svg";
import frame3 from "../../../public/Frame3.svg";
import frame6 from "../../../public/Frame6.svg";

function HomePage({ children }) {
  return (
    <>
      <header>
        <div className="container">
          <select className={css.select}>
            <option>$ PLN</option>
          </select>
          <select className={css.select}>
            <option>ENG</option>
          </select>
        </div>
      </header>
      <section className={cx(css.section, css.section__head)}>
        <div className="container">
          <h1 className={css.title}>
            Your Low-Cost Multi-City
            <br />
            adventure starts here!
          </h1>

          {children}
        </div>
        <img src={bg} className={css.bg} alt="" />
      </section>
      <section className={css.section}>
        <div className="container">
          <div className={css.row}>
            <div className={css.col}>
              <h2>Seek More, Spend Less</h2>
              <p>
                We made planning multi-city trips a breeze. All that is required
                is your starting point and desired dates. From there, you can
                easily add cities to your roster, compare potential flights, and
                choose the path that best fits your dreams and budgets. Even
                last-minute changes are easy. With us, you get to navigate the
                world of affordable travel with ease, turning your dream
                multi-city adventure into reality.
              </p>
            </div>
            <div className={css.col}>
              <img src={frame5} alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className={css.section}>
        <div className="container">
          <div className={css.row}>
            <div className={css.col}>
              <h2>Your Journey, Your Rules</h2>
              <p>
                We believe every travel enthusiast should have the freedom to
                design their own transformative journey. We empower you to be
                the architect of your own adventure, building your route city by
                city, according to your preferences and our vast selection of
                low-cost one-way flights. Each step of the way, you command the
                course while we provide the means to make it surprisingly
                affordable.
              </p>
            </div>
            <div className={css.col}>
              <img src={frame3} alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className={css.section}>
        <div className="container">
          <div className={css.row}>
            <div className={css.col}>
              <h2>
                Tailored Adventures,
                <br />
                Unforgettable Experiences
              </h2>
              <p>
                We aren't about predefined travels; we are about crafting your
                personal tale of exploration. Every city you chose to add, every
                flight you decide to take, contributes to making your journey
                genuinely yours. With us, you're not just saving money; you're
                also making priceless memories in cities you've always wished to
                visit. Your unforgettable multi-city adventure starts right at
                your fingertips - all you need to do is start building your
                route with us today.
              </p>
            </div>
            <div className={css.col}>
              <img src={frame6} alt="" />
            </div>
          </div>
        </div>
      </section>

      <div className={css.mobile} data-nosnippet>
        Big Screens, Big Experience: For the best user experience, use this app
        on tablets or desktops. Stay tuned for our mobile-friendly update!
      </div>
    </>
  );
}

export default HomePage;

//  <p>
//    Ditch the fixed routes. Embrace the freedom to design your trip, city by
//    city, with budget-friendly options at every turn. Using Europe's low-cost
//    airlines.
//  </p>;
