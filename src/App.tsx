import React from "react";
import "./App.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/login/login-page";
import { SignUpPage } from "./pages/signup/sign-up-page";
import { HomePage } from "./pages/home/home-page";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
