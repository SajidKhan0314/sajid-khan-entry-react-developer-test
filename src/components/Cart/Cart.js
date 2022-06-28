import React, { Component, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Product from "./Product/Product";
import { Button } from "../UI/StyledComponents/StyledComponents";
import { getAllPrices } from "../../utilities/utilities";

class Cart extends Component {
  render() {
    const products = this.props.products;
    const { tax = 0, finalPrice = 0 } = getAllPrices(
      products,
      this.props.selectedCurrency
    );
    let productElements = [];
    Object.keys(products).forEach((productKey) => {
      products[productKey].cartData.forEach((productAttr) => {
        let productEl = (
          <Product
            key={productKey}
            id={productKey}
            product={products[productKey]}
            productAttributes={productAttr}
          />
        );
        productElements.push(productEl);
      });
    });

    return (
      <Fragment>
        <SecondaryHeading>Cart</SecondaryHeading>
        <ul>{productElements}</ul>
        <FinalPrice>
          <p>Tax 21%:</p>{" "}
          <strong>
            {this.props.selectedCurrency.symbol} {tax.toFixed(2)}
          </strong>
          <p>Quantity:</p> <strong>{this.props.totalProducts}</strong>
          <Total>Total:</Total> <strong>{finalPrice.toFixed(2)}</strong>
        </FinalPrice>
        <Button width="27.9rem" primary>
          Order
        </Button>
      </Fragment>
    );
  }
}

// Can add prop types if working in team
Cart.propTypes = {};

const mapStateToProps = (state) => ({
  selectedCurrency: state.currency.selectedCurrency,
  totalProducts: state.cart.totalProducts,
  products: state.cart.products,
});

export default connect(mapStateToProps)(Cart);

const SecondaryHeading = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 4rem;
  text-transform: uppercase;
  margin-bottom: 5.5rem;
`;

const FinalPrice = styled.div`
  font-weight: 400;
  font-size: 2.4rem;
  line-height: 2.8rem;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-row-gap: 0.8rem;
  grid-column-gap: 0.6rem;
  margin-bottom: 1.6rem;
`;

const Total = styled.p`
  font-weight: 500;
  font-size: 2.4rem;
  line-height: 2.8rem;
`;
