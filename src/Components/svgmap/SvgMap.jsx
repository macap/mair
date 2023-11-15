import React, { Component } from "react";
import { loadMap } from "./helpers";
import PanAndZoom from "./panAndZoom";
import "./svgmap.css";
import countries from "./map.json";

const Country = (props) => (
  <path
    id={props.country.id}
    title={props.country.title}
    className={props.selected ? "land visited" : "land"}
    d={props.country.d}
  />
);

export class SvgMap extends Component {
  state = {
    countries: [],
  };

  componentDidMount() {
    // loadMap().then((countries) =>
    this.setState({ countries: countries.countries.path });
    // TODO: fix map loading
    // );
  }

  render() {
    return (
      <PanAndZoom>
        <svg style={{ width: "1008px", height: "651px" }}>
          <g>
            {this.state.countries.map((c) => (
              <Country
                key={c.id}
                country={c}
                selected={this.props.selectedCountries.includes(c.title)}
              />
            ))}
          </g>
          {this.props.children}
        </svg>
      </PanAndZoom>
    );
  }
}
