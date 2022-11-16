import styled from "styled-components";

type ButtonProps = {
  fluid?: boolean;
  secondary?: boolean;
};

const Button = styled.button<ButtonProps>`
  min-height: 3rem;
  min-width: 50%;
  width: ${({ fluid }) => (fluid ? "100%" : "unset")};
  cursor: pointer;

  color: ${({ secondary }) => (secondary ? "tomato" : "white")};
  border: 1px solid tomato;
  border-radius: 4pt;
  background-color: ${({ secondary }) => (secondary ? "white" : "tomato")};

  &:hover {
    color: white;
    background-color: #f63e02;
    border-color: #f63e02;
  }

  transition: all 0.15s ease-in-out;
`;

export default Button;
