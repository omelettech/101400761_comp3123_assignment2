import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import Employee from "./screens/Employee/Employee";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
