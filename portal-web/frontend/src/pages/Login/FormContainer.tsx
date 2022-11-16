import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  height: 100%;
  width: 30%;
  flex-direction: column;
  justify-content: center;

  h1:first-child {
    margin-bottom: 30px;
  }

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export default FormContainer;
