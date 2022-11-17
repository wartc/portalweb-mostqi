import styled from "styled-components";

type SideNavigationProps = {
  expanded?: boolean;
  children: React.ReactNode[];
};

const SideContainer = styled.aside<{ expanded?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ expanded }) => (expanded ? "200px" : "50px")};
  padding-left: 20px;
  margin-right: 20px;
`;

export const SideItem = styled.div<{ selected: boolean }>`
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

export const SideNavigation = ({ expanded, children }: SideNavigationProps) => (
  <SideContainer expanded={expanded}>{children}</SideContainer>
);
