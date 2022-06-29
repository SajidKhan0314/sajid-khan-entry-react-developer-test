import React, { Component, Fragment } from "react";
import styled, { css } from "styled-components";
import Icon from "../../UI/Icon/Icon";
import ImageSlider from "./ImageSlider/ImageSlider";
import { connect } from "react-redux";
import { incrementProduct, decrementProduct } from "../../../store/cartSlice";
import { getProductPrice } from "../../../utilities/utilities";

class Product extends Component {
  incrementProductInCartHandler = (product) => {
    this.props.incrementProduct(product);
  };

  decrementProductInCartHandler = (product) => {
    this.props.decrementProduct(product);
  };

  render() {
    const { id, product, productAttributes } = this.props;
    const productPrice = getProductPrice(
      product.prices,
      this.props.selectedCurrency
    );
    return (
      <ProductBox>
        <ProductDetails>
          <CompanyName>{product.brand}</CompanyName>
          <ProductName>{product.name}</ProductName>
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
        <ImageSlider gallery={product.gallery} productName={product.name} />
      </ProductBox>
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);

const ProductBox = styled.li`
  display: flex;
  font-size: 1.6rem;
  line-height: 2.56rem;
  padding: 2.4rem 0;
  border-top: 1px solid var(--color-gray-2);

  &:last-child {
    border-bottom: 1px solid var(--color-gray-2);
    margin-bottom: 3.2rem;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const CompanyName = styled.p`
  font-size: 3rem;
  font-weight: 600;
  line-height: 2.7rem;
  margin-bottom: 1.6rem;
`;

const ProductName = styled.p`
  font-size: 3rem;
  font-weight: 400;
  line-height: 2.7rem;
  margin-bottom: 2rem;
`;

const ProductPrice = styled.p`
  font-weight: 700;
  font-size: 2.4rem;
  line-height: 2.4rem;
  margin-bottom: 2rem;
`;

const SectionLabel = styled.p`
  font-family: "Roboto Condensed", sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.8rem;
  margin-bottom: 1rem;
`;

const ProductVariants = styled.ul`
  display: flex;
  gap: 0.8rem;
  list-style: none;

  &:not(:last-child) {
    margin-bottom: 1.6rem;
  }
`;

const ProductVariant = styled.li`
  &[data-size]::after {
    content: attr(data-size);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 1.6rem;
    padding: 0 0.2rem;
    min-width: 6.3rem;
    height: 4.5rem;
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
  width: 3.6rem;
  height: 3.6rem;

  &::after {
    content: "";
    width: 3.2rem;
    height: 3.2rem;
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

const ProductAmountButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-right: 2.4rem;
  margin-left: auto;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.5rem;
    height: 4.5rem;
    background-color: #fff;
    border: 1px solid var(--color-text);
    cursor: pointer;

    &:hover {
      background-color: var(--color-text);
      color: #fff;
    }
  }

  p {
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 3.8rem;
  }
`;
