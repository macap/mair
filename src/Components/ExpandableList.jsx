import { useState, useEffect, Children } from "react";

function ExpandableList({ children }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [children]);

  return (
    <>
      {expanded ? children : Children.toArray(children).slice(0, 10)}
      {expanded ? null : (
        <div key="more" style={{ textAlign: "center" }}>
          <a href="#" onClick={() => setExpanded(true)}>
            more
          </a>
        </div>
      )}
    </>
  );
}

export default ExpandableList;
