import { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal-root");

class Portal extends Component {
  render() {
    return ReactDOM.createPortal(this.props.children, modalRoot);
  }
}

// Can add prop types if working in team
Portal.propTypes = {};

export default Portal;
