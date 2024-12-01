import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Spinner} from "react-activity";
import "react-activity/dist/library.css"

const backend_API = axios.create({
    baseURL: "https://comp3123-useremp.vercel.app/api/v1",
    headers: {"Content-Type": "application/json"},
})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleLogin = async () => {
        // Placeholder for login logic
        if(!email || !password){
            setError("All fields are required")
            return
        }else if(!emailRegex.test(email)){
            setError("Email must be like: test@test.test")
            return
        }



        setLoading(true)
        try {
            const response = await backend_API.post("/user/login",
                {
                    email: email, password: password
                }
            )
            if(response.status===200){
                navigate("/employee")
            }

        } catch (e) {
            console.error(e)
            setLoading(false)
            setError("Wrong email or passowrd")

        }

    };

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <h1>Login</h1>
            {!loading && <form style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <label>
                    Email:
                    <input value={email} type="email" required onChange={(e)=>setEmail(e.target.value)}/>
                </label>
                <label>
                    Password:
                    <input value={password} type="password" required onChange={(e)=>setPassword(e.target.value)}/>
                </label>
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
                <h3 style={{color:"red"}}>{error}</h3>
            </form>}
            {loading && <Spinner/>}
            <p>
                Don't have an account?
                <Link to={"/signup"}>Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
