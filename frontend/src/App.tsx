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
  clearLocalStorage,
} from "./utils/localStorageUserData";

function App() {
  const dispatch = useDispatch();
  const [refresh] = useRefreshTokenMutation();

  useEffect(() => {
    const initAuth = async () => {
      // await getLocalStorage(); // Assuming getLocalStorage is asynchronous and returns a Promise
      const token = Cookies.get("isAuthenticated");
      const refreshToken = Cookies.get("isRefreshable");

      // If refresh token is available, refresh the tokens and re-authenticate the user
      if (refreshToken) {
        const userData = await refresh().unwrap();
        setLocalStorageUserData(userData);
        dispatch(authenticateUser(userData));
      }

      // If no refresh token, unauthenticate the user
      else {
        clearLocalStorage();
        dispatch(unauthenticateUser());
      }
    };

    initAuth();
  }, [dispatch, refresh]);

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
