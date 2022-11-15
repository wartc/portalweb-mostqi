import styled from "styled-components";

type ButtonProps = {
  secondary?: boolean;
};

const Button = styled.button<ButtonProps>`
  min-height: 2.5rem;
  cursor: pointer;

  color: ${({ secondary }) => (secondary ? "tomato" : "white")};
  border: 1px solid tomato;
  border-radius: 4pt;
  background-color: ${({ secondary }) => (secondary ? "white" : "tomato")};

  &:hover {
    ${({ secondary }) => (secondary ? "color" : "background-color")}: #f63e02;
    border-color: #f63e02;
  }

  transition: all 0.15s ease-in-out;
`;

export default Button;
