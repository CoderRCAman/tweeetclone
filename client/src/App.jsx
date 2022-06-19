import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import Login from "./pages/Login";

import Home from "./pages/Home";
import LoadingPage from "./components/LoadingPage";
import UserProvider from "./state/UserProvider";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile"; 
import Notifications from "./pages/Notifications";
import Register from "./pages/Register";
//TO DO -> make a global context api to store all the authenticated information
//alogin with users details,etc ..
export default function App() {
  const isAuthenticated = () => {
    const isLogged = localStorage.getItem("firstLogin");
    return isLogged ? true : false;
  };
  console.log(isAuthenticated())
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={isAuthenticated()?<Navigate to='/home'/> : <Landing />} />
          <Route
            path="/home"
            element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={isAuthenticated() ?<Navigate to='/home'/>  : <Login />}
          />
            <Route
            path="/register"
            element={isAuthenticated() ? <Navigate to='/home'/> : <Register />}
          />
          <Route
            path="/profile"
            element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/notification"
            element={
              isAuthenticated() ? <Notifications /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}
