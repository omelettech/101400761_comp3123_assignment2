import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
const backend_API = axios.create({
    baseURL: "https://comp3123-useremp.vercel.app/api/v1",
    headers: { "Content-Type": "application/json" },
})
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Signup: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        if(!email || !password || !username){
            setError("All fields are required")
            return
        }else if(!emailRegex.test(email)){
            setError("Email must be like: test@test.test")
            return
        }else if(password.length<8){
            setError("Password must be 8 or more characters")
        }

        try {
            const response = await backend_API.post("/user/signup",
                {
                    username:username,email: email, password: password
                }
            )
            console.log(response.data)
        }catch (e){
            console.error(e)
        }

        navigate("/login");
    };

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <h1>Signup</h1>
            <form style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <label>
                    Username:
                    <input value={username} type="text" required onChange={(e)=>setUsername(e.target.value)}/>
                </label>
                <label>
                    Email:
                    <input value={email} type="email" required onChange={(e)=>setEmail(e.target.value)}/>
                </label>
                <label>
                    Password:
                    <input value={password} type="password" required onChange={(e)=>setPassword(e.target.value)}/>
                </label>
                <h3 style={{color:"red"}}>{error}</h3>
                <button type="button" onClick={handleSignup}>
                    Sign Up
                </button>
            </form>
            <p>
                Already have an account? <Link to={"/login"}>Login</Link>
            </p>
        </div>
    );
};

export default Signup;
