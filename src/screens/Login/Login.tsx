import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios/index";
import ActivityIndicator from "react-activity/dist/shared/ActivityIndicator";

const backend_API = axios.create({
    baseURL: "https://comp3123-useremp.vercel.app/api/v1",
    headers: {"Content-Type": "application/json"}
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
            const response = await backend_API.post("user/login",
                {
                    email: email, password: password
                }
            )
            console.log(response.data)
        }catch (e){
            console.error(e)
        }

        navigate("/employee");
    };

    return (
        <div>
            <h1>Login</h1>
            {!loading && <form>
                <label>
                    Email:
                    <input type="email" required/>
                </label>
                <label>
                    Password:
                    <input type="password" required/>
                </label>
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>}
            {loading && <ActivityIndicator defaultAnimationDuration={2}/>}
            <p>
                Don't have an account?
                <Link to={"/signup"}>Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
