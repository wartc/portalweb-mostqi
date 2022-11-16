import styled from "styled-components";

import { ReactComponent as RegisteredIllustration } from "../../assets/images/RegisteredIllustration.svg";

export default styled(RegisteredIllustration)`
  width: 30%;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    display: none;
  }
`;
