import React, { Component, Fragment } from "react";
import styled, { css } from "styled-components";
import Icon from "../../../UI/Icon/Icon";
import { connect } from "react-redux";
import {
  incrementProduct,
  decrementProduct,
} from "../../../../store/cartSlice";
import { getProductPrice } from "../../../../utilities/utilities";

const Product = styled.div`
  display: flex;
  gap: 0.8rem;
  font-size: 1.6rem;
  line-height: 2.56rem;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ProductHeader = styled.h3`
  font-weight: 300;
  white-space: nowrap;
`;

const ProductPrice = styled.p`
  font-weight: 500;
`;

const SectionLabel = styled.p`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.6rem;
  white-space: nowrap;
`;

const ProductVariants = styled.ul`
  display: flex;
  gap: 0.8rem;
  list-style: none;
`;

const ProductVariant = styled.li`
  &[data-size]::after {
    content: attr(data-size);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 1.4rem;
    padding: 0 0.2rem;
    min-width: 2.4rem;
    height: 2.4rem;
    color: var(--color-text);
    border: 1px solid var(--color-text);
  }

  ${(props) =>
    props.isActive &&
    css`
      &[data-size]::after {
        background-color: black;
        color: #fff;
      }
    `};
`;

const ProductColorVariant = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;

  &::after {
    content: "";
    width: 1.6rem;
    height: 1.6rem;
    ${(props) => css`
      background-color: ${props.color};
    `}
  }

  ${(props) =>
    props.isActive &&
    css`
      border: 1px solid var(--color-primary);
    `};
`;

const ProductAmountButtons = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  margin-left: auto;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.4rem;
    height: 2.4rem;
    background-color: #fff;
    border: 1px solid var(--color-text);
    cursor: pointer;

    &:hover {
      background-color: var(--color-text);
      color: #fff;
    }
  }
`;
const ProductImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  height: 19rem;
  width: 12.1rem;
`;

class CartBoxProduct extends Component {
  incrementProductInCartHandler = (product) => {
    this.props.incrementProduct(product);
  };

  decrementProductInCartHandler = (product) => {
    this.props.decrementProduct(product);
  };

  render() {
    let { id, product, productAttributes } = this.props;
    const productPrice = getProductPrice(
      product.prices,
      this.props.selectedCurrency
    );

    return (
      <Product>
        <ProductDetails>
          <ProductHeader>{product.brand}</ProductHeader>
          <ProductHeader>{product.name}</ProductHeader>
          <ProductPrice>{productPrice}</ProductPrice>
          {product.availableAttributes.map((availableAttribute) => {
            return (
              <Fragment key={availableAttribute.name}>
                <SectionLabel>{availableAttribute.name}:</SectionLabel>
                <ProductVariants>
                  {availableAttribute.items.map((attrItem) => {
                    if (
                      availableAttribute.name.toLowerCase().includes("color")
                    ) {
                      return (
                        <ProductColorVariant
                          isActive={
                            productAttributes.attributes[
                              availableAttribute.name
                            ] === attrItem.id
                          }
                          color={attrItem.value}
                          key={attrItem.value}
                        />
                      );
                    }
                    return (
                      <ProductVariant
                        isActive={
                          productAttributes.attributes[
                            availableAttribute.name
                          ] === attrItem.id
                        }
                        data-size={attrItem.value}
                        key={attrItem.value}
                      />
                    );
                  })}
                </ProductVariants>
              </Fragment>
            );
          })}
        </ProductDetails>
        <ProductAmountButtons>
          <button
            onClick={this.incrementProductInCartHandler.bind(this, {
              id,
              ...productAttributes,
            })}
          >
            <Icon name="plus" height={1} width={1} />
          </button>
          <p>{productAttributes.quantity}</p>
          <button
            onClick={this.decrementProductInCartHandler.bind(this, {
              id,
              ...productAttributes,
            })}
          >
            <Icon name="minus" height={1} width={1} />
          </button>
        </ProductAmountButtons>
        <ProductImage src={product.gallery[0]} alt={product.name} />
      </Product>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedCurrency: state.currency.selectedCurrency,
});

const mapDispatchToProps = {
  incrementProduct,
  decrementProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartBoxProduct);
