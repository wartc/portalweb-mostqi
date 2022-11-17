import { Navigate } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../contexts/AuthContext";
import Loading from "../ui/components/Loading";

const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type ProtectedRouteProps = {
  requiredType?: "CLIENT" | "CONTRIBUTOR";
  children: JSX.Element;
};

const ProtectedRoute = ({ requiredType, children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading)
    return (
      <LoadingContainer>
        <Loading visible={true} />
      </LoadingContainer>
    );

  return user && (!requiredType || user.type === requiredType) ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
