import React, { Component } from "react";
import styled from "styled-components";
import BrandIcon from "../../assets/svg/brand-icon.svg";
import Navigation from "./Navigation/Navigation";
import CartOverlay from "./CartOverlay/CartOverlay";
import CurrencyDropdown from "./CurrencyDropdown/CurrencyDropdown";
import { Flexbox } from "../UI/StyledComponents/StyledComponents";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isCurrencyDropdownOpen: false,
      isCartOpen: false,
    };
    this.currencyRef = React.createRef(null);
    this.cartRef = React.createRef(null);
  }

  toggleHandler = (key) => {
    this.setState((oldState) => {
      return {
        [key]: !oldState[key],
      };
    });
  };

  clickOutsideHandler = (event) => {
    if (
      !this.currencyRef.current.contains(event.target) &&
      this.state.isCurrencyDropdownOpen
    ) {
      this.setState({ isCurrencyDropdownOpen: false });
    }

    if (!this.cartRef.current.contains(event.target) && this.state.isCartOpen) {
      this.setState({ isCartOpen: false });
    }
  };

  componentDidMount = () => {
    document.addEventListener("mousedown", this.clickOutsideHandler);
  };

  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.clickOutsideHandler);
  };

  render() {
    return (
      <HeaderContainer>
        <Navigation navigations={this.props.navigations} />
        <Logo src={BrandIcon} alt="Brand Icon" />
        <Flexbox gap="2rem" alignSelf="center">
          <RelativeBox ref={this.currencyRef}>
            <CurrencyDropdown
              onToggleDropdown={this.toggleHandler}
              showMenu={this.state.isCurrencyDropdownOpen}
              currencies={this.props.currencies}
            />
          </RelativeBox>
          <RelativeBox ref={this.cartRef}>
            <CartOverlay
              show={this.state.isCartOpen}
              onToggleOverlay={this.toggleHandler}
            />
          </RelativeBox>
        </Flexbox>
      </HeaderContainer>
    );
  }
}

export default Header;

const HeaderContainer = styled.header`
  z-index: 1001;
  position: relative;
  height: 8rem;
  display: flex;
  justify-content: space-between;
  padding: 0 10.1rem;
  background-color: #fff;
`;

const Logo = styled.img`
  display: block;
  width: 4.1rem;
  heigh: 4.1rem;
  object-fit: contain;
`;

const RelativeBox = styled.div`
  position: relative;
`;
