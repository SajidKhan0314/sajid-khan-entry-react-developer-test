import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Icon from "../../../UI/Icon/Icon";

class ImageSlider extends Component {
  constructor() {
    super();
    this.state = {
      selectedImageIndex: 0,
    };
  }

  changeImage = (swipe) => {
    let oldIndex = this.state.selectedImageIndex;
    if (swipe === "prev") {
      if (--oldIndex < 0) {
        oldIndex = this.props.gallery.length - 1;
      }
      return this.setState({ selectedImageIndex: oldIndex });
    }

    if (++oldIndex === this.props.gallery.length) {
      oldIndex = 0;
    }
    return this.setState({ selectedImageIndex: oldIndex });
  };

  render() {
    return (
      <ProductImages>
        <ProductImage
          src={this.props.gallery[this.state.selectedImageIndex]}
          alt={this.props.productName}
        />
        {this.props.gallery.length > 1 && (
          <ProductImagesSwitchButtons>
            <button onClick={this.changeImage.bind(this, "prev")}>
              <Icon name="chevron-left" />
            </button>
            <button onClick={this.changeImage.bind(this, "next")}>
              <Icon name="chevron-right" />
            </button>
          </ProductImagesSwitchButtons>
        )}
      </ProductImages>
    );
  }
}

// Can add prop types if working in team
ImageSlider.propTypes = {};

export default ImageSlider;

const ProductImages = styled.div`
  position: relative;
  display: block;
  width: 20rem;
  min-height: 28.8rem;
  object-fit: cover;
`;

const ProductImagesSwitchButtons = styled.span`
  position: absolute;
  display: flex;
  gap: 0.8rem;
  bottom: 1.6rem;
  right: 1.6rem;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0.6rem 0.8rem;
    color: #fff;
    cursor: pointer;
  }
`;

const ProductImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
