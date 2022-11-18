import { useState } from "react";
import styled from "styled-components";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { CgPushChevronLeft, CgPushChevronRight } from "react-icons/cg";

import { SideNavigation, SideItem } from "../../components/SideNavigation";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
`;

const ContributorLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  return (
    <LayoutContainer>
      <SideNavigation expanded={expanded}>
        <SideItem
          selected={pathname === "/clients"}
          onClick={() => navigate("/clients")}
        >
          <FaUsers size="2em" />
          {expanded ? <span>Clientes</span> : null}
        </SideItem>
        <SideItem
          selected={pathname === "/addClient"}
          onClick={() => navigate("/addClient")}
        >
          <FaUserPlus size="2em" />
          {expanded ? <span>Novo cliente</span> : null}
        </SideItem>
        <SideItem onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <CgPushChevronLeft size="1.75em" />
          ) : (
            <CgPushChevronRight size="1.75em" />
          )}
        </SideItem>
      </SideNavigation>

      {children}
    </LayoutContainer>
  );
};

export default ContributorLayout;
