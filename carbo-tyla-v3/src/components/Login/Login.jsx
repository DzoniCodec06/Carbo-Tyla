import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { loginUser } from "../../utils/auth";

import Loading from "../Loading/Loading";

import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hide, setHide] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;  
          console.log(user);
          const tokenId = user.uid;
          loginUser(tokenId);
          //alert("Login successful!");
          navigate("/");
          location.reload();
        } catch (error) {
          alert(error.message);
        }
    };

    if (loading) {
        return <Loading />
    }

    return(
        <div className="container">
            <h1 id="title">WELCOME <br /> TO <br /> CARBO-TYLA <br /> ENJOY</h1>
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="inputs">
                        <label htmlFor="email">E-Mail: </label>
                        <input className="form-input" type="e-mail" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email:"/>
                        <label htmlFor="passwrd">Password: </label>
                        <div className="paswInput">
                            <i id="eyeIcon" onClick={() => setHide(!hide)} className={hide ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                            <input id="form-input" type={hide ? "password" : "text"} name="passwrd" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password:"/>
                        </div>
                    </div>
                    <div className="buttons">
                        <button type="button" className="btn" id="sgnp" onClick={() => navigate("/signup")}>Signup</button>
                        <button className="btn" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;