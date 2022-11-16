import styled from "styled-components";

import { ReactComponent as LoginIllustration } from "../../assets/images/InvestmentIllustration.svg";

export default styled(LoginIllustration)`
  width: 50%;

  @media (max-width: 1024px) {
    display: none;
  }
`;
