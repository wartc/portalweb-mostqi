import styled from "styled-components";

const FormContainer = styled.div`
  width: 50%;
  height: 50%;
  background-color: white;
  border-radius: 10px;
  border: 1px solid rgba(152, 152, 166, 0.1);
  box-shadow: 0 2px 4px -1px rgba(152, 152, 166, 0.2),
    0 4px 5px 0px rgba(152, 152, 166, 0.14),
    0 1px 10px 0px rgba(152, 152, 166, 0.12);

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export default FormContainer;
