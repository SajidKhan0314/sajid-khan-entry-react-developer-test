import { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import ProductListingPage from "./components/ProductListingPage/ProductListingPage";
import ProductDetailsPage from "./components/ProductDetailsPage/ProductDetailsPage";
import Cart from "./components/Cart/Cart";
import styled from "styled-components";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import { updateCurrency } from "./store/currencySlice";

const AppContainer = styled.div`
  min-height: 100vh;
  overflow: hidden;
`;

const MainContainer = styled.main`
  padding: 8rem 10.1rem;
`;

const CATEGORIES_CURRENTCIES_QUERY = gql`
  {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Query query={CATEGORIES_CURRENTCIES_QUERY}>
          {({ loading, error, data }) => {
            if (loading || error) return null;

            return (
              <>
                <Header
                  navigations={data.categories}
                  currencies={data.currencies}
                />
                <MainContainer>
                  <Routes>
                    <Route path="/:category" element={<ProductListingPage />} />
                    <Route
                      path="/:category/:productId"
                      element={<ProductDetailsPage />}
                    />
                    <Route path="/cart" element={<Cart />} />
                    <Route
                      path="*"
                      element={
                        <Navigate
                          to={`/${data.categories[0].name}`}
                          replace={true}
                        />
                      }
                    />
                  </Routes>
                </MainContainer>
              </>
            );
          }}
        </Query>
      </AppContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedCurrency: state.currency.selectedCurrency,
});

const mapDispatchToProps = { updateCurrency };

export default connect(mapStateToProps, mapDispatchToProps)(App);
