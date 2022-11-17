import styled from "styled-components";
import { FaUsers } from "react-icons/fa";

type SideNavigationProps = {
  expanded?: boolean;
  selected: "Clientes" | "Adicionar cliente";
};

const SideContainer = styled.aside<{ expanded?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ expanded }) => (expanded ? "200px" : "50px")};
  padding-left: 20px;
  margin-right: 20px;
`;

const SideItem = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  padding-left: 30px;
  padding-right: 30px;

  color: ${({ selected }) => (selected ? "#FF4A4A" : "black")};
  border-radius: 20px;
  background-color: ${({ selected }) => (selected ? "#FF4A4A11" : "white")};
`;

const SideNavigation = ({ expanded, selected }: SideNavigationProps) => (
  <SideContainer expanded={expanded}>
    <SideItem selected={selected === "Clientes"}>
      <FaUsers size="2em" />
      {expanded ? "Clientes" : null}
    </SideItem>
    <SideItem selected={selected === "Adicionar cliente"}>
      <FaUsers size="2em" />
      {expanded ? "Adicionar cliente" : null}
    </SideItem>
  </SideContainer>
);

export default SideNavigation;
