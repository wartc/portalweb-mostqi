import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default Layout;
