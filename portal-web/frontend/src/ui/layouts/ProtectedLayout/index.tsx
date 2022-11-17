import { Outlet, useLocation } from "react-router-dom";
import ProtectedRoute from "../../../pages/ProtectedRoute";
import LayoutContainer from "./LayoutContainer";
import SideNavigation from "../../components/SideNavigation";

type ProtectedLayoutProps = {
  requiredType?: "CONTRIBUTOR" | "CLIENT";
};

const ProtectedLayout = ({ requiredType }: ProtectedLayoutProps) => {
  const { pathname: currentRoute } = useLocation();

  return (
    <ProtectedRoute requiredType={requiredType}>
      <LayoutContainer>
        <SideNavigation
          expanded
          selected={
            currentRoute === "/clients" ? "Clientes" : "Adicionar cliente"
          }
        />
        <Outlet />
      </LayoutContainer>
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
