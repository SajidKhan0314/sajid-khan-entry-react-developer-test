import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

class Navigation extends Component {
  render() {
    return (
      <nav>
        <NavList>
          {this.props.navigations.map((navigation) => {
            return (
              <li key={navigation.name}>
                <StyledNavLink to={navigation.name} key={navigation.name}>
                  {navigation.name}
                </StyledNavLink>
              </li>
            );
          })}
        </NavList>
      </nav>
    );
  }
}

// Can add prop types if working in team
Navigation.propTypes = {};

export default Navigation;

const NavList = styled.ul`
  list-style: none;
  text-transform: uppercase;
  display: flex;
  height: 100%;

  ${(props) =>
    css`
      flex-direction: ${props.direction || "row"};
    `};
`;

const StyledNavLink = styled(NavLink)`
  width: 9.7rem;
  height: 100%;
  text-decoration: none;
  color: var(--color-text);
  display: inline-block;
  border-bottom: 2px solid transparent;
  padding-top: 2.8rem;
  text-align: center;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, font-weight 0.1s;

  &:hover,
  &.active {
    font-weight: 600;
    color: var(--color-primary);
    border-bottom: 2px solid var(--color-primary);
  }

  ${(props) =>
    props.isActive &&
    css`
      font-weight: 600;
      color: var(--color-primary);
      border-bottom: 2px solid var(--color-primary);
    `};
`;
