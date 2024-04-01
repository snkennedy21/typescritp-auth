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

function App() {
  const dispatch = useDispatch();
  const [refresh] = useRefreshTokenMutation();

  useEffect(() => {
    const token = Cookies.get("isAuthenticated");
    const refreshToken = Cookies.get("isRefreshable");

    if (!token && refreshToken) {
      refresh();
    }
    if (token) {
      dispatch(authenticateUser());
    } else {
      dispatch(unauthenticateUser());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/protected" element={<TestAuth />} />
          <Route path="/unprotected" element={<UnprotectedEndpoint />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
