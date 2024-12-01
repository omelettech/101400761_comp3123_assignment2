import React, {useState} from 'react';
import {EmployeeData} from "./Employee";
import axios from "axios";

interface EmployeeFormProps {
    employee?: EmployeeData
    closeModal: () => void
}

const initData = {
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: ''
}

const EmployeeForm = ({employee, closeModal}: EmployeeFormProps) => {
    const [employeeData, setEmployeeData] = useState(employee || initData);

    const buttonText = employee ? "Update Records" : "Add Employee"
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEmployeeData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async () => {
        if(employee){
            //edit mode
            try {
               await axios.put(
                    `https://comp3123-useremp.vercel.app/api/v1/emp/employees/${employee._id}`,
                    employeeData
                );
            }catch (e){
                console.error(e)
            }
        }else{
            try {
                await axios.post(
                    `https://comp3123-useremp.vercel.app/api/v1/emp/employees`,
                    employeeData
                );
            }catch (e){
                console.error(e)
            }
        }
        closeModal()
    };
    return (


        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    name="first_name"
                    value={employeeData.first_name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    name="last_name"
                    value={employeeData.last_name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={employeeData.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Position:</label>
                <input
                    type="text"
                    name="position"
                    value={employeeData.position}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Salary:</label>
                <input
                    type="number"
                    name="salary"
                    value={employeeData.salary}
                    onChange={handleInputChange}
                    required
                />
            </div>
            {/*Not allow date of joining to be changed because too much validations*/}
            {!employee && <div>
                <label>Date of Joining:</label>
                <input
                    type="date"
                    name="date_of_joining"
                    value={employeeData.date_of_joining}
                    onChange={handleInputChange}
                    required
                />
            </div>}
            <div>
                <label>Department:</label>
                <input
                    type="text"
                    name="department"
                    value={employeeData.department}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <button type="submit">{buttonText}</button>
        </form>

    );
};

export default EmployeeForm;