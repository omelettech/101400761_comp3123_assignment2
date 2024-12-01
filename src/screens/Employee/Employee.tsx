import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';
import EmployeeForm from "./EmployeeFOrm";


interface EmployeeProps {

}

export interface EmployeeData {
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
}

const Employee = ({}: EmployeeProps) => {
    const navigate = useNavigate();
    const [employeeList, setEmployeeList] = useState<EmployeeData[]|any[]>([]);
    const [filteredEmployeeList, setFilteredEmployeeList] = useState<any[] | EmployeeData[]>([])
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);
    const [addEmployee, setAddEmployee] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");


    const closeModal = () => {
        setSelectedEmployee(null)
        setAddEmployee(false)
    }


    useEffect(() => {
        const getAllEmployees = async () => {
            try {
                const response = await axios.get("https://comp3123-useremp.vercel.app/api/v1/emp/employees")
                setEmployeeList(response.data)
                setFilteredEmployeeList(response.data)
            } catch (e) {
                console.error(e)
            }
        }
        getAllEmployees().then(() => {

        }).catch((error) => {
            console.error("An error occurred while fetching employees:", error);
        });

    }, []);
    useEffect(() => {
        if(searchQuery===""){
            setFilteredEmployeeList(employeeList)
        }
        if(employeeList){
            const filtered = employeeList.filter((employee) => {
                const query = searchQuery.toLowerCase();
                return (
                    employee.first_name.toLowerCase().includes(query) ||
                    employee.last_name.toLowerCase().includes(query) ||
                    employee.department.toLowerCase().includes(query) ||
                    employee.position.toLowerCase().includes(query)
                );
            });
            setFilteredEmployeeList(filtered);
        }

    }, [searchQuery]);
    const handleLogout = () => {
        // Placeholder for logout logic
        navigate("/");
    };


    function deleteEmployee(id: string, event: any) {
        event.stopPropagation(); // Prevent row click from being triggered
        try {
            axios.delete(`https://comp3123-useremp.vercel.app/api/v1/emp/employees?eid=${id}`)
        }catch (e){
            console.error(e)
        }
    }

    const findEmployee = async (id: string) => {
        //TODO: Place find emp logic
        closeModal()
        try {
            const resp = await axios.get("https://comp3123-useremp.vercel.app/api/v1/emp/employees/" + id)
            setSelectedEmployee(resp.data)

        } catch (e) {
            console.error(e)
        }

    };


    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            {(selectedEmployee || addEmployee) &&
                <div className={"modal_background"}>
                    <div className={"modal_form"}>
                        <div style={{width:"100%",display:"flex",flexDirection:"row-reverse",position:"absolute",top:0,left:0}}>
                            <button onClick={closeModal} style={{backgroundColor:"red"}}>x</button>
                        </div>

                        {
                            !addEmployee && selectedEmployee &&
                            <EmployeeForm employee={selectedEmployee} closeModal={closeModal}></EmployeeForm>
                        }
                        {
                            !selectedEmployee && addEmployee &&
                            <EmployeeForm closeModal={closeModal}></EmployeeForm>
                        }

                    </div>
                </div>
            }
            <h1>Employee Dashboard</h1>
            <p>Welcome to the employee dashboard!</p>
            <button onClick={() => {
                closeModal()
                setAddEmployee(true)
            }}>Add Employee +
            </button>
            <div>
                <label>
                    Search:
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, department, or position"
                    />
                </label>
            </div>
            <table style={{
                width: "100%",
                borderCollapse: "collapse",
                border: 1,
                borderWidth: 1,
                borderStyle: "solid",

            }}>
                <thead>
                <tr>
                    {/*<th>ID</th>*/}
                    <th>Name</th>
                    <th>Position</th>
                    <th>Email</th>
                    <th>Salary</th>
                    <th>date_of_joining</th>
                    <th>Department</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredEmployeeList.length > 0 ? (
                    filteredEmployeeList.map((employee) => (
                        <tr key={employee._id}
                            onClick={() => findEmployee(employee._id)}
                            style={{
                                cursor: "pointer",
                                fontSize: 18,
                                textDecoration: "underline",
                                color: "blue",
                            }}
                            className={"datas"}
                        >
                            {/*<td>{employee._id}</td>*/}
                            <td>{`${employee.first_name} ${employee.last_name}`}</td>
                            <td>{employee.position}</td>
                            <td>{employee.email}</td>
                            <td>${employee.salary.toLocaleString()}</td>
                            <td>{employee.date_of_joining.slice(0, 10)}</td>
                            <td>{employee.department}</td>
                            <td>
                                <i
                                    className="fas fa-trash delete-icon"
                                    style={{width: "100%"}}
                                    onClick={(e) => deleteEmployee(employee._id, e)}
                                ></i>
                            </td>

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
        </div>
    );
};

export default Employee;
