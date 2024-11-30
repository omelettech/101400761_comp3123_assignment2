import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import Employee from "./screens/Employee/Employee";

function HomePage() {
    return (
        <div>
            <h2>Welcome to my employee thingy</h2>
            <h1>Name: Awsaf Fida Mahmud | 101400761</h1>
            <h2>Assignment 2</h2>
            <Link to={"/login"}>Login to see employees</Link>
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path={"/"} element={<HomePage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/employee" element={<Employee/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
