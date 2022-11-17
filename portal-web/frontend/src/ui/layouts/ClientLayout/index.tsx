import { useState } from "react";
import styled from "styled-components";

import { SideNavigation, SideItem } from "../../components/SideNavigation";
import { FaUsers } from "react-icons/fa";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
`;

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <LayoutContainer>
      <SideNavigation expanded={expanded}>
        <SideItem selected={true}>
          <FaUsers size="2em" />
          {expanded ? "Clientes" : null}
        </SideItem>
        <SideItem selected={false}>
          <FaUsers size="2em" />
          {expanded ? "Adicionar cliente" : null}
        </SideItem>
      </SideNavigation>
    </LayoutContainer>
  );
};

export default ClientLayout;
