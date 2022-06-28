import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Icon from "../../UI/Icon/Icon";
import Backdrop from "../../UI/Backdrop/Backdrop";
import styled from "styled-components";
import { withRouter } from "../../../hoc/withRouter";
import { connect } from "react-redux";
import CartBoxProduct from "./CartBoxProduct/CartBoxProduct";
import { Button, Flexbox } from "../../UI/StyledComponents/StyledComponents";
import { getAllPrices } from "../../../utilities/utilities";

class CartOverlay extends Component {
  goToCart = () => {
    this.props.onToggleOverlay("isCartOpen");
    this.props.navigate("/cart");
  };

  render() {
    let productElements = [];
    let { products, totalProducts, onToggleOverlay, show } = this.props;
    const { totalPrice = 0 } = getAllPrices(
      products,
      this.props.selectedCurrency
    );
    Object.keys(products).forEach((productKey) => {
      products[productKey].cartData.forEach((productAttr) => {
        productElements.push(
          <CartBoxProduct
            key={productKey}
            id={productKey}
            product={products[productKey]}
            productAttributes={productAttr}
          />
        );
      });
    });

    return (
      <Fragment>
        <CartButton
          data-count={totalProducts || null}
          onClick={onToggleOverlay.bind(this, "isCartOpen")}
        >
          <Icon name="cart" />
        </CartButton>
        {show && (
          <Fragment>
            <Backdrop onClicked={onToggleOverlay.bind(this, "isCartOpen")} />
            <CartBox>
              <CartBoxHeader>
                My Bag<Thin>, {totalProducts} items</Thin>
              </CartBoxHeader>
              <Products>{productElements}</Products>
              <Flexbox margin="4.1rem 0 3.2rem 0" justify="space-between">
                <p>
                  <strong>Total:</strong>
                </p>
                <p>
                  <strong>{totalPrice}</strong>
                </p>
              </Flexbox>
              <Flexbox gap="1.2rem" justify="space-between" flexItems>
                <Button onClick={this.goToCart.bind(this)}>View bag</Button>
                <Button primary>Check out</Button>
              </Flexbox>
            </CartBox>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

// Can add prop types if working in team
CartOverlay.propTypes = {};

const mapStateToProps = (state) => ({
  selectedCurrency: state.currency.selectedCurrency,
  totalProducts: state.cart.totalProducts,
  products: state.cart.products,
});

export default withRouter(connect(mapStateToProps)(CartOverlay));

const CartButton = styled.button`
  position: relative;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &::before {
    visibility: hidden;
  }

  &[data-count]::before {
    visibility: visible;
    content: attr(data-count);
    position: absolute;
    left: 1.1rem;
    bottom: 1.3rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #000;
    color: #fff;
    font-family: "Roboto", sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CartBox = styled.div`
  z-index: 1000;
  position: absolute;
  top: 5.1rem;
  right: -2rem;
  background-color: #fff;
  min-width: 32.5rem;
  padding: 3.2rem 1.6rem;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

const CartBoxHeader = styled.h3`
  font-weight: 700;
  margin-bottom: 3.2rem;
`;

const Products = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Thin = styled.span`
  font-weight: 500;
`;
