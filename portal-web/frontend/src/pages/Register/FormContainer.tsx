import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  width: 35%;
  flex-direction: column;
  align-items: center;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }

  & > button {
    margin-top: 5px;
  }
`;

export default FormContainer;
