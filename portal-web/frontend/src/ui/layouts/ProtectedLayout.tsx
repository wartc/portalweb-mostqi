import styled from "styled-components";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import Loading from "../components/Loading";

const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProtectedLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading)
    return (
      <LoadingContainer>
        <Loading visible={true} />
      </LoadingContainer>
    );

  if (!user) return <Navigate to="/" />;

  return <Outlet />;
};

export default ProtectedLayout;
