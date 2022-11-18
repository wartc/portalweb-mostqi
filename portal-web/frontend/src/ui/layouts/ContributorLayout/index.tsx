import { useState } from "react";
import styled from "styled-components";

import { SideNavigation, SideItem } from "../../components/SideNavigation";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { CgPushChevronLeft, CgPushChevronRight } from "react-icons/cg";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
`;

const ContributorLayout = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <LayoutContainer>
      <SideNavigation expanded={expanded}>
        <SideItem selected={true}>
          <FaUsers size="2em" />
          {expanded ? <span>Clientes</span> : null}
        </SideItem>
        <SideItem selected={false}>
          <FaUserPlus size="2em" />
          {expanded ? <span>Novo cliente</span> : null}
        </SideItem>
        <SideItem>
          {expanded ? (
            <CgPushChevronLeft
              size="1.75em"
              onClick={() => setExpanded(false)}
            />
          ) : (
            <CgPushChevronRight
              size="1.75em"
              onClick={() => setExpanded(true)}
            />
          )}
        </SideItem>
      </SideNavigation>

      {children}
    </LayoutContainer>
  );
};

export default ContributorLayout;
