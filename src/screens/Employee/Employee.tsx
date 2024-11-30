import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


interface EmployeeProps {

}

interface EmployeeData {
    _id: string
    first_name: string
    last_name: string
    email: string
    position: string
    salary: number
    date_of_joining: string
    department: string
    createdAt: string
    updatedAt: string
} //TODO: implement types instead of "any"
const Employee = ({}: EmployeeProps) => {
    const navigate = useNavigate();
    const [filteredEmployeeList, setFilteredEmployeeList] = useState<any[] | EmployeeData[]>([])
    let employeeList: any[] | EmployeeData[] = [] // to store the whole list
    useEffect(() => {
        const getAllEmployees = async () => {
            try {
                const response = await axios.get("https://comp3123-useremp.vercel.app/api/v1/emp/employees")
                employeeList = response.data
            } catch (e) {
                console.error(e)
            }
        }
        getAllEmployees().then(() => {
            setFilteredEmployeeList(employeeList)
            console.log("Employee list has been fetched successfully!");
            console.log(employeeList); // Use employeeList here
        }).catch((error) => {
            console.error("An error occurred while fetching employees:", error);
        });

    }, []);

    const handleLogout = () => {
        // Placeholder for logout logic
        navigate("/");
    };

    return (
        <div>
            <h1>Employee Dashboard</h1>
            <p>Welcome to the employee dashboard!</p>
            <table style={{width: "100%", borderCollapse: "collapse"}}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Email</th>
                    <th>Salary</th>
                    <th>date_of_joining</th>
                    <th>Department</th>
                </tr>
                </thead>
                <tbody>
                {filteredEmployeeList.length > 0 ? (
                    filteredEmployeeList.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee._id}</td>
                            <td>{`${employee.first_name} ${employee.last_name}`}</td>
                            <td>{employee.position}</td>
                            <td>{employee.email}</td>
                            <td>${employee.salary.toLocaleString()}</td>
                            <td>{employee.date_of_joining.slice(0,10)}</td>
                            <td>{employee.department}</td>

                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} style={{textAlign: "center"}}>
                            No employees found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Employee;
