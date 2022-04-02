import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "components/navbar/NavBar";
import Request from "components/Request";
import Profile from "./components/Profile";

import "./index.css";

function App() {
  const { isLoading, getAccessTokenSilently } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <div className="container flex-grow-1">
        <Routes>
          <Route path="/" element={<Request />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
