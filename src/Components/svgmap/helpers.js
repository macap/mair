export const loadMap = () => {
    return fetch("/map.json")
        .then(res => res.json())
}

export const convertGeoToPixel = (lat, lon) => {
  const mapWidth = 1008;
  const mapHeight = 650.94;
  const mapLonLeft =-169.6; // leftLongitude
  //="83.68"; //topLatitude
  const mapLonRight =190.25; //rightLongitude
  const mapLatBottom = -55.55; //bottomLatitude
  const mapLonDelta = mapLonRight - mapLonLeft;
  const mapLatBottomDegree = mapLatBottom * Math.PI / 180;

    var x = (lon - mapLonLeft) * (mapWidth / mapLonDelta);

    lat = lat * Math.PI / 180;
    var worldMapWidth = ((mapWidth / mapLonDelta) * 360) / (2 * Math.PI);
    var mapOffsetY = (worldMapWidth / 2 * Math.log((1 + Math.sin(mapLatBottomDegree)) / (1 - Math.sin(mapLatBottomDegree))));
    var y = mapHeight - ((worldMapWidth / 2 * Math.log((1 + Math.sin(lat)) / (1 - Math.sin(lat)))) - mapOffsetY);

    return {x:x, y:y};
}

export const createPathBetweenTwoPoints = (from, to, i = 3) => {
  // converts latlng to point on the map
  const x1 = from.x;
  const x2 = to.x;
  const y1 = from.y;
  const y2 = to.y;

  const cx = (x1+x2)/2;
  const cy = (y1+y2)/2;
  const dx = (x2-x1)/2;
  const dy = (y2-y1)/2;

  const k = 20;
  const n=3;

  const dd = Math.sqrt(dx*dx+dy*dy);
  const ex = cx + dy/dd * k * (i-(n-1)/2);
  const ey = cy - dx/dd * k * (i-(n-1)/2);

  return "M"+x1+" "+y1+"Q"+ex+" "+ey+" "+x2+" "+y2;
}
