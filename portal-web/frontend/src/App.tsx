import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DefaultLayout from "./ui/layouts/DefaultLayout";
import ProtectedLayout from "./ui/layouts/ProtectedLayout";

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
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<ProtectedLayout requiredType="CONTRIBUTOR" />}>
          <Route path="/clients" element={<Clients />} />
          <Route path="/addClient" element={<AddClient />} />
        </Route>
        <Route element={<ProtectedLayout requiredType="CLIENT" />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
