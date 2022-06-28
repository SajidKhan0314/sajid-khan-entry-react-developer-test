import styled, { css } from "styled-components";

export const Flexbox = styled.div`
  display: flex;

  ${(props) =>
    css`
      align-self: ${props.alignSelf};
      align-items: ${props.align};
      justify-content: ${props.justify};
      flex-direction: ${props.direction};
      margin: ${props.margin};
      gap: ${props.gap};
      ${props.flexItems && "&>*{flex:1}"}
    `};
`;

export const Button = styled.button`
  display: block;
  padding: 1.3rem 0;
  font-family: "Raleway", sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 0;
  border: 1px solid var(--color-text);
  background-color: #fff;
  cursor: pointer;

  ${(props) =>
    props.primary &&
    css`
      background-color: var(--color-primary);
      color: #fff;
      border-color: var(--color-primary);
    `};

  ${(props) =>
    css`
      margin: ${props.margin};
      width: ${props.width};
    `};
`;
