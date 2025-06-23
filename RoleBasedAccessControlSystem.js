// Was asked to build a Role Based Access Control System. Was asked to implement custom routes along with Authentication and Authorisation. 
// Code was expected to be properly production ready and scalable.
// More requirements were added as we progressed like Redirections in absence of roles for a specific route

---Auth State & User Context----
Use React Context or Redux to store:

User info

Auth token

Roles/permissions


---component structure----------
/src
  /auth
    AuthProvider.js        // Provides context
    useAuth.js             // Custom hook
  /routes
    PrivateRoute.js        // Route wrapper with RBAC
    RouteConfig.js         // All route definitions
  /pages
    Login.js
    Dashboard.js
    Unauthorized.js
    AdminPage.js
  /utils
    roleUtils.js           // Helper for role checks
  App.js


// auth/AuthProvider.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user = { name, roles: ['admin'] }

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// routes/PrivateRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const PrivateRoute = ({ allowedRoles, redirectTo = "/unauthorized" }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.some((role) => user.roles.includes(role))) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};




// routes/RouteConfig.js
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AdminPage from "../pages/AdminPage";
import Unauthorized from "../pages/Unauthorized";

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/unauthorized" element={<Unauthorized />} />

    <Route path="/" element={<Dashboard />} />

    <Route element={<PrivateRoute allowedRoles={['admin']} />}>
      <Route path="/admin" element={<AdminPage />} />
    </Route>
  </Routes>
);



// App.js
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { AppRoutes } from "./routes/RouteConfig";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;



