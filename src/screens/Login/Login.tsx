import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Spinner} from "react-activity";
import "react-activity/dist/library.css"

const backend_API = axios.create({
    baseURL: "https://comp3123-useremp.vercel.app/api/v1",
    headers: {"Content-Type": "application/json"},
})
const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        // Placeholder for login logic
        setLoading(true)
        try {
            const response = await backend_API.post("/user/login",
                {
                    email: email, password: password
                }
            )
            console.log(response.data)
        } catch (e) {
            console.error(e)
        }

        navigate("/employee");
    };

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <h1>Login</h1>
            {!loading && <form>
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
