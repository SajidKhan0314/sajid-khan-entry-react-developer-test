import React, { Component } from "react";
import Portal from "../Portal/Portal";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const BackdropContainer = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.22);
`;

class Backdrop extends Component {
  render() {
    return (
      <Portal>
        <BackdropContainer onClick={this.props.onClicked} />
      </Portal>
    );
  }
}

// Can add prop types if working in team
Backdrop.propTypes = {};

export default Backdrop;
