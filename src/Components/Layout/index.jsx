import css from "./Layout.module.scss";

function Layout({ children }) {
  return <div className={css.layout}>{children}</div>;
}

Layout.Header = function ({ children }) {
  return <div className={css.header}>{children}</div>;
};

Layout.Footer = function ({ children }) {
  return <div className={css.footer}>{children}</div>;
};

Layout.Aside = function ({ children }) {
  return <div className={css.aside}>{children}</div>;
};

Layout.Content = function ({ children }) {
  return <div className={css.content}>{children}</div>;
};

Layout.Row = function ({ children }) {
  return <div className={css.row}>{children}</div>;
};

export default Layout;
