import React from 'react';
import {convertGeoToPixel} from './helpers';

export const SvgMapMarker = (props) => {
  const latlng = (props.latlng) ? props.latlng.split(',') : [props.lat, props.lng];
  const origin = convertGeoToPixel(latlng[0],latlng[1]);

  return (
    <g>
      <circle cx={origin.x} cy={origin.y} className="map-city" r="2" onClick={props.clickHandler}>
        <title>
          {props.name}
        </title>
      </circle>
    </g>
  )
}
