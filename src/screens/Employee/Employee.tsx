import React from "react";
import { useNavigate } from "react-router-dom";


interface EmployeeProps {
}

const Employee = ({}: EmployeeProps) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Placeholder for logout logic
        navigate("/");
    };

    return (
        <div>
            <h1>Employee Dashboard</h1>
            <p>Welcome to the employee dashboard!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Employee;
