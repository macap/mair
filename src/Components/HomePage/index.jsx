import css from "./HomePage.module.scss";

function HomePage({ children }) {
  return <div className={css.wrapper}>{children}</div>;
}
export default HomePage;
