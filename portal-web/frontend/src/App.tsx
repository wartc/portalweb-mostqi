import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CenteredLayout from "./ui/layouts/CenteredLayout";
import ProtectedLayout from "./ui/layouts/ProtectedLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Clients from "./pages/Clients";
import Currency from "./pages/Currency";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<CenteredLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route element={<ProtectedLayout requiredType="CONTRIBUTOR" />}>
          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <Clients />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route element={<ProtectedLayout requiredType="CLIENT" />}>
          <Route
            path="/currency"
            element={
              <ProtectedRoute>
                <Currency />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
