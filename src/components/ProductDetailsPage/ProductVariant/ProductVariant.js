import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

class ProductVariant extends Component {
  render() {
    let productVariantElement = null;
    let input = null;
    let { id, attrType, value, index, onChanged } = this.props;

    input = (
      <input
        defaultChecked={index === 0}
        id={attrType + id}
        type="radio"
        name={attrType}
        value={value}
        onChange={onChanged}
      />
    );

    productVariantElement = (
      <Variant key={attrType + id}>
        {input}
        <label htmlFor={attrType + id}>{value}</label>
      </Variant>
    );

    if (attrType.toLowerCase().includes("color")) {
      productVariantElement = (
        <ColorVariant key={attrType + id} color={value}>
          {input}
          <label htmlFor={attrType + id}></label>
        </ColorVariant>
      );
    }

    return <Fragment>{productVariantElement}</Fragment>;
  }
}

// Can add prop types if working in team
ProductVariant.propTypes = {};

export default ProductVariant;

const Variant = styled.li`
  display: inline-block;
  position: relative;

  input {
    position: absolute;
    visibility: hidden;
    left: 999rem;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 1.6rem;
    width: 6.3rem;
    height: 4.5rem;
    color: var(--color-text);
    background-color: #fff;
    border: 1px solid var(--color-text);
    cursor: pointer;
  }

  input:checked + label {
    background-color: var(--color-text);
    color: #fff;
  }
`;

const ColorVariant = styled.li`
  position: relative;

  input {
    position: absolute;
    visibility: hidden;
    left: 999rem;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.6rem;
    height: 3.6rem;
    cursor: pointer;
  }

  label::after {
    content: "";
    width: 3.2rem;
    height: 3.2rem;
    ${(props) =>
      css`
        background-color: ${props.color || "black"};
      `};
  }

  input:checked + label {
    border: 1px solid var(--color-primary);
  }
`;
