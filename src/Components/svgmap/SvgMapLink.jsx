import React from 'react';
import {convertGeoToPixel, createPathBetweenTwoPoints} from './helpers';

export const SvgMapLink = (props) => {

  const from = convertGeoToPixel(props.from.lat,props.from.lng);
  const to = convertGeoToPixel(props.to.lat,props.to.lng);

  const color = '#'+Math.floor(Math.random()*16777215).toString(16); // totally random color

  return (
    <g>
      <path className="flightpath" d={createPathBetweenTwoPoints(from, to)} strokeWidth="1" fill="none" stroke={color} onClick={props.onClick} />
    </g>
  )
}
