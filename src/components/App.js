import React, { useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function App() {

  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={user?.accessToken ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route exact path="/reset" element={!user?.accessToken ? <Reset /> : <Navigate to="/dashboard" />} />
          <Route exact path="/dashboard" element={user?.accessToken ? <Dashboard /> : <Navigate to="/login" />} />
          <Route exact path="/login" element={user?.accessToken ? <Navigate to="/dashboard" /> : <Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;   