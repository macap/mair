import { lazy, Suspense } from "react";

const SvgMap = lazy(() => import("../Components/svgmap/SvgMap.jsx"));
const FlightDots = lazy(() => import("../Components/MapFlightDots/index.jsx"));

function Map() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SvgMap>
        <FlightDots />
      </SvgMap>
    </Suspense>
  );
}

export default Map;
