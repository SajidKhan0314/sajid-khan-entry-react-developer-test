import React, { Component } from "react";
import styled, { css } from "styled-components";
import Icon from "../UI/Icon/Icon";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { withRouter } from "../../hoc/withRouter";
import { connect } from "react-redux";
import { addProduct } from "../../store/cartSlice";
import { getProductPrice } from "../../utilities/utilities";

const PRODUCTS_QUERY = gql`
  query GetProducts($input: CategoryInput!) {
    category(input: $input) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        brand
        attributes {
          name
          type
          items {
            id
            displayValue
            value
          }
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;

class ProductListingPage extends Component {
  goToDetailsPageHandler = (productId, e) => {
    e.stopPropagation();
    this.props.navigate(productId);
  };

  addToCartHandler = (product, e) => {
    e.stopPropagation();
    this.props.addProduct(product);
  };

  render() {
    return (
      <Query
        query={PRODUCTS_QUERY}
        variables={{ input: { title: this.props.params.category || "" } }}
      >
        {({ loading, error, data }) => {
          if (loading || error) return null;
          if (!data.category) return this.props.navigate("/");
          return (
            <>
              <SecondaryHeading>{this.props.params.category}</SecondaryHeading>
              <ProductsGrid>
                {data.category.products.map((product) => {
                  const productPrice = getProductPrice(
                    product.prices,
                    this.props.selectedCurrency
                  );
                  return (
                    <Product
                      key={product.id}
                      outOfStock={!product.inStock}
                      onClick={this.goToDetailsPageHandler.bind(
                        this,
                        product.id
                      )}
                    >
                      <ProductImage
                        src={product.gallery[0]}
                        alt={product.name}
                      />
                      <AddToCartButton
                        onClick={this.addToCartHandler.bind(this, product)}
                      >
                        <Icon name="cart" />
                      </AddToCartButton>
                      <ProductName>
                        {product.brand} {product.name}
                      </ProductName>
                      <ProductPrice>{productPrice}</ProductPrice>
                    </Product>
                  );
                })}
              </ProductsGrid>
            </>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedCurrency: state.currency.selectedCurrency,
});

const mapDispatchToProps = {
  addProduct,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductListingPage)
);

const SecondaryHeading = styled.h2`
  font-size: 4.2rem;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 6.72rem;
  margin-bottom: 11.4rem;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-row-gap: 10.3rem;
  grid-column-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(38.6rem, 40rem));
`;

const AddToCartButton = styled.button`
  display: none;
  position: absolute;
  right: 3.1rem;
  bottom: 5.6rem;
  justify-content: center;
  align-items: center;
  height: 5.2rem;
  width: 5.2rem;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: #fff;
  border: none;
  cursor: pointer;
  filter: var(--button-box-shadow);

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const Product = styled.div`
  position: relative;
  padding: 1.6rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }

  ${(props) =>
    !props.outOfStock &&
    css`
      &:hover {
        & ${AddToCartButton} {
          display: flex;
        }
      }
    `}

  ${(props) =>
    props.outOfStock &&
    css`
      &::before {
        content: "out of stock";
        position: absolute;
        display: grid;
        place-items: center;
        place-content: center;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        color: var(--color-gray-3);
        font-size: 2.4rem;
        text-transform: uppercase;
        background-color: rgba(255, 255, 255, 0.5);
        padding-bottom: 5rem;
      }
    `}
`;

const ProductImage = styled.img`
  display: block;
  height: 33rem;
  width: 100%;
  object-fit: contain;
  margin-bottom: 2.4rem;
`;

const ProductName = styled.p`
  font-size: 1.8rem;
  font-weight: 300;
`;

const ProductPrice = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
`;
