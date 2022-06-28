import React, { Component } from "react";
import PropTypes from "prop-types";
import sprite from "../../../assets/svg/sprite.svg";

class Icon extends Component {
  render() {
    return (
      <svg
        style={{
          height: `${this.props.height}rem`,
          width: `${this.props.width}rem`,
        }}
      >
        <use href={`${sprite}#icon-${this.props.name}`} />
      </svg>
    );
  }
}

// Can add prop types if working in team
Icon.propTypes = {};

Icon.defaultProps = {
  height: 2,
  width: 2,
};

export default Icon;
