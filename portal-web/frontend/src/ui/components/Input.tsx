import styled from "styled-components";

type InputProps = {
  label: string;
  fluid?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Container = styled.div<{ fluid?: boolean }>`
  display: flex;
  flex-direction: column;

  width: ${({ fluid }) => (fluid ? "100%" : "unset")};

  &:focus-within label {
    color: #ff4438;
  }
`;

const StyledInput = styled.input`
  min-height: 2.5rem;
  padding: 12px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 8px;

  &:focus {
    border: 1px solid #ff4438;

    &::placeholder {
      color: transparent;
    }
  }

  &::placeholder {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.4);
  }

  transition: border 0.15s ease-in-out;
`;

const StyledLabel = styled.label`
  font-size: 14px;

  transition: color 0.15s ease-in-out;
`;

const Input = (props: InputProps) => {
  return (
    <Container fluid={props.fluid}>
      <StyledLabel>{props.label}</StyledLabel>
      <StyledInput {...props} />
    </Container>
  );
};

export default Input;
