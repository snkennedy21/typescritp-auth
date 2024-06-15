import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Signup from "./components/signup/Signup";
import Navigation from "./components/navigation/Navigation";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import TestAuth from "./components/testAuth/TestAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authenticateUser, unauthenticateUser } from "./store/authSlice"; // Adjust the path as necessary
import Cookies from "js-cookie";
import { useRefreshTokenMutation } from "./store/mainApi";
import UnprotectedEndpoint from "./components/unprotectedEndpoint/unprotectedEndpoint";
import {
  setLocalStorageUserData,
  clearLocalStorageUserData,
} from "./utils/localStorageUserData";
import AuthProvider from "./components/authProvider/AuthProvider";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <AuthProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/protected" element={<TestAuth />} />
            <Route path="/unprotected" element={<UnprotectedEndpoint />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
