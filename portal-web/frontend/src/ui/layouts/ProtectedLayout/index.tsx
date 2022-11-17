import { Outlet } from "react-router-dom";
import ProtectedRoute from "../../../pages/ProtectedRoute";

type ProtectedLayoutProps = {
  requiredType?: "CONTRIBUTOR" | "CLIENT";
};

const ProtectedLayout = ({ requiredType }: ProtectedLayoutProps) => {
  return (
    <ProtectedRoute requiredType={requiredType}>
      <Outlet />
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
