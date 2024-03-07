import React from "react";
import Signup from "./components/signup/Signup";
import Navigation from "./components/navigation/Navigation";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import TestAuth from "./components/testAuth/TestAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<TestAuth />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
