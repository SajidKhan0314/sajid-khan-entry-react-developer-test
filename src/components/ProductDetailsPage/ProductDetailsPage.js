import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { withRouter } from "../../hoc/withRouter";
import { connect } from "react-redux";
import { addProduct } from "../../store/cartSlice";
import { Markup } from "interweave";
import { Button } from "../UI/StyledComponents/StyledComponents";
import { getProductPrice } from "../../utilities/utilities";
import ProductVariant from "./ProductVariant/ProductVariant";

const PRODUCT_QUERY = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
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
`;

class ProductDetailsPage extends Component {
  constructor() {
    super();
    this.state = {
      selectedImage: null,
      selectedAttributes: {},
    };
  }

  changImageHandler = (image) => {
    this.setState({ selectedImage: image });
  };

  addProductToCartHandler = (product) => {
    this.props.addProduct({
      ...product,
      selectedAttributes: this.state.selectedAttributes,
    });
  };

  changeSelectedAttributeHandler = ({ key, value }) => {
    this.setState((oldState) => {
      return {
        selectedAttributes: {
          ...oldState.selectedAttributes,
          [key]: value,
        },
      };
    });
  };

  render() {
    return (
      <Container>
        <Query
          query={PRODUCT_QUERY}
          variables={{ id: this.props.params.productId }}
        >
          {({ loading, error, data }) => {
            if (loading || error) return null;
            if (!data.product) return <p>No product found.</p>;
            const { product } = data;
            const productPrice = getProductPrice(
              product.prices,
              this.props.selectedCurrency
            );
            return (
              <Fragment>
                <ProductImages>
                  {product.gallery.map((imgSrc) => {
                    return (
                      <ProductImageItem
                        key={imgSrc}
                        onClick={this.changImageHandler.bind(this, imgSrc)}
                      >
                        <ProductImage src={imgSrc} alt={product.name} />
                      </ProductImageItem>
                    );
                  })}
                </ProductImages>
                <SelectedProductImage
                  src={this.state.selectedImage || product.gallery[0]}
                  alt={product.name}
                />
                <ProductDetails>
                  <CompanyName>{product.brand}</CompanyName>
                  <ProductName>{product.name}</ProductName>
                  {product.attributes.map((availableAttribute) => {
                    return (
                      <Fragment key={availableAttribute.name}>
                        <SectionLabel>{availableAttribute.name}:</SectionLabel>
                        <ProductVariants>
                          {availableAttribute.items.map((attrItem, index) => {
                            return (
                              <ProductVariant
                                index={index}
                                id={attrItem.id}
                                attrType={availableAttribute.name}
                                value={attrItem.value}
                                onChanged={this.changeSelectedAttributeHandler.bind(
                                  this,
                                  {
                                    key: availableAttribute.name,
                                    value: attrItem.id,
                                  }
                                )}
                                key={availableAttribute.name + attrItem.id}
                              />
                            );
                          })}
                        </ProductVariants>
                      </Fragment>
                    );
                  })}
                  <ProductPrice>{productPrice}</ProductPrice>
                  <Button
                    primary
                    margin="0 0 4rem 0"
                    onClick={this.addProductToCartHandler.bind(this, product)}
                  >
                    Add to cart
                  </Button>
                  <Markup content={product.description} />
                </ProductDetails>
              </Fragment>
            );
          }}
        </Query>
      </Container>
    );
  }
}

// Can add prop types if working in team
ProductDetailsPage.propTypes = {};

const mapStateToProps = (state) => ({
  selectedCurrency: state.currency.selectedCurrency,
});

const mapDispatchToProps = {
  addProduct,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetailsPage)
);

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4rem;
`;

const ProductImages = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  list-style: none;
  height: 51.1rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ProductImageItem = styled.li`
  width: 7.9rem;
  height: 8rem;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const SelectedProductImage = styled.img`
  width: 61rem;
  height: 51.1rem;
  object-fit: cover;
  object-position: top;
  margin-right: 6rem;
`;

const ProductDetails = styled.div`
  width: 29.2rem;
  display: flex;
  flex-direction: column;
`;

const CompanyName = styled.p`
  font-size: 3rem;
  font-weight: 600;
  line-height: 2.7rem;
  white-space: nowrap;
  margin-bottom: 1.6rem;
`;

const ProductName = styled.p`
  font-size: 3rem;
  font-weight: 400;
  line-height: 2.7rem;
  white-space: nowrap;
  margin-bottom: 4.3rem;
`;

const SectionLabel = styled.p`
  font-family: "Roboto Condensed", sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.8rem;
  margin-bottom: 0.8rem;
`;

const ProductVariants = styled.ul`
  display: flex;
  gap: 0.8rem;
  list-style: none;
  margin-bottom: 2.4rem;
`;

const ProductPrice = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.8rem;
  margin-top: 0.2rem;
  margin-bottom: 2rem;
`;
