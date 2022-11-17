import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./pages/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Clients from "./pages/Clients";
import Dashboard from "./pages/Dashboard";
import AddClient from "./pages/AddClient";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute requiredType="CONTRIBUTOR" />}>
          <Route path="/clients" element={<Clients />} />
          <Route path="/addClient" element={<AddClient />} />
        </Route>
        <Route element={<ProtectedRoute requiredType="CLIENT" />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
