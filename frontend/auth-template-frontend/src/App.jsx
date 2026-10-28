
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import PublicEntries from "./pages/PublicEntries";
import MyEntries from "./pages/MyEntries";
import CreateEntry from "./pages/CreateEntry";

import { logout } from "./services/authService";

function getUserFromToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

function App() {
  const [user, setUser] = useState(getUserFromToken());

  function handleLogout() {
    logout();
    setUser(null);
  }

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/sign-up" element={<SignupPage />} />

        <Route
          path="/sign-in"
          element={<SignInPage setUser={setUser} />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/entries"
          element={<PublicEntries />}
        />

        <Route
          path="/my-entries"
          element={
            <ProtectedRoute user={user}>
              <MyEntries />
            </ProtectedRoute>
          }
        />

        <Route
          path="/entries/create"
          element={
            <ProtectedRoute user={user}>
              <CreateEntry />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
