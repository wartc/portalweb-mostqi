import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CenteredLayout from "./ui/layouts/CenteredLayout";
import ProtectedLayout from "./ui/layouts/ProtectedLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<CenteredLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
