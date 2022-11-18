import { Children, cloneElement } from "react";
import styled from "styled-components";

type SideItemProps = {
  selected?: boolean;
  expanded?: boolean;
  onClick?: () => void;
};

type SideNavigationProps = {
  expanded?: boolean;
  children: React.ReactElement<SideItemProps>[];
};

const SideContainer = styled.aside<{ expanded?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ expanded }) => (expanded ? "200px" : "50px")};
  margin-left: 20px;
  margin-right: 30px;
`;

export const SideItem = styled.div<SideItemProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ expanded }) => (expanded ? "flex-start" : "center")};
  width: 100%;
  height: 45px;
  padding-left: ${({ expanded }) => (expanded ? "20px" : "0px")};

  color: ${({ selected }) => (selected ? "#FF4A4A" : "black")};
  border-radius: 10px;
  background-color: ${({ selected }) =>
    selected ? "#FF4A4A11" : "transparent"};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};

  & > span {
    margin-left: 25px;
    white-space: nowrap;
  }
`;

export const SideNavigation = ({ expanded, children }: SideNavigationProps) => (
  <SideContainer expanded={expanded}>
    {Children.map(children, (el) => {
      return cloneElement(el, { expanded });
    })}
  </SideContainer>
);
