import React, { Component, Fragment } from "react";
import styled, { css } from "styled-components";
import Icon from "../../UI/Icon/Icon";
import { withRouter } from "../../../hoc/withRouter";
import { connect } from "react-redux";
import { updateCurrency } from "../../../store/currencySlice";

class CurrencyDropdown extends Component {
  constructor(props) {
    super();
    if (!props.selectedCurrency) {
      props.updateCurrency(props.currencies[0]);
    }
  }

  changeCurrencyHandler = (newCurrency) => {
    this.props.updateCurrency(newCurrency);
    this.props.onToggleDropdown("isCurrencyDropdownOpen");
  };

  render() {
    return (
      <Fragment>
        {this.props.selectedCurrency && (
          <Fragment>
            <CurrencyDropdownHeader
              onClick={this.props.onToggleDropdown.bind(
                this,
                "isCurrencyDropdownOpen"
              )}
            >
              {this.props.selectedCurrency.symbol}{" "}
              <Icon name="chevron-down" height={1} width={0.8} />
            </CurrencyDropdownHeader>
            {this.props.showMenu && (
              <CurrencyDropdownMenu>
                {this.props.currencies.map((currency) => {
                  return (
                    <CurrencyDropdownItem
                      isActive={
                        currency.label === this.props.selectedCurrency.label
                      }
                      key={currency.label}
                    >
                      <button
                        onClick={this.changeCurrencyHandler.bind(
                          this,
                          currency
                        )}
                      >
                        {currency.symbol} {currency.label}
                      </button>
                    </CurrencyDropdownItem>
                  );
                })}
              </CurrencyDropdownMenu>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedCurrency: state.currency.selectedCurrency,
});

const mapDispatchToProps = {
  updateCurrency,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CurrencyDropdown)
);

const CurrencyDropdownHeader = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.8rem;
  font-weight: 500;
  cursor: pointer;
`;

const CurrencyDropdownMenu = styled.ul`
  position: absolute;
  top: 4rem;
  left: -2rem;
  padding: 0.8rem 0;
  background-color: #fff;
  width: 11.4rem;
  list-style: none;
  text-transform: uppercase;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.08);
`;

const CurrencyDropdownItem = styled.li`
  button {
    width: 100%;
    border: none;
    background-color: transparent;
    padding: 1.3rem 2rem;
    font-size: 1.8rem;
    font-weight: 500;
    text-align: start;
    cursor: pointer;

    ${(props) =>
      props.isActive &&
      css`
        background-color: var(--color-gray-1);
      `}

    &:hover {
      background-color: var(--color-gray-1);
    }
  }
`;
