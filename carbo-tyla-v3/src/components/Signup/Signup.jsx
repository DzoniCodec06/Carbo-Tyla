import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { loginUser } from "../../utils/auth";
import { auth, firestore } from "../../../firebase";
import { arrayUnion, doc, setDoc } from "firebase/firestore"

import Loading from "../Loading/Loading";

import "./Signup.css"

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setconfPassword] = useState("");
    const [passMatch, setPassMatch] = useState(true);
    const [hide, setHide] = useState(true);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    });

    const navigate = useNavigate();

    const saveUserDataToFirestore = async (user) => {
        if (user) {
            try {
                await setDoc(doc(firestore, "users", user.uid), {
                    name: name,
                    email: email,
                    createdAt: new Date(),
                    spidersNumber: 0,
                    spiders: {}
                });
            } catch (err) {
                console.error(err);
            }
        }
    }

    const checkPassword = async (e) => {
        const newConfPassword = e.target.value;
        if (newConfPassword === "") setPassMatch(true);
        else {
            setconfPassword(newConfPassword);
            console.log(newConfPassword); // Logs the latest value
    
            if (newConfPassword === password) setPassMatch(true);
            else setPassMatch(false);
        }

        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password == confPassword) {
            setPassMatch(true);
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                const tokenId = user.uid;
                await updateProfile(user, {displayName: name});
                await saveUserDataToFirestore(user);
                await signInWithEmailAndPassword(auth, email, password);
                loginUser(tokenId);
                //alert("Signup successful!");
                console.log(user);
                navigate("/");
                location.reload();
            } catch (error) {
                alert(error);
            }  
        } else {
            setPassMatch(false);
            console.log("pass not match")
        }
    }

    if (loading) {
        return <Loading />
    }

    return(
        <div className="container">
            <h1 id="title">WELCOME <br /> TO <br /> CARBO-TYLA <br /> ENJOY</h1>
            <div className="login-form">
                <h1>Create Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <label htmlFor="name">Name: </label>
                        <input id="form-input" type="text" name="name" placeholder="Enter Name:" onInput={(e) => setName(e.target.value)}/>
                        <label htmlFor="email">E-Mail: </label>
                        <input id="form-input" type="e-mail" name="email" placeholder="Enter Email:" onInput={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="passwrd">Password: </label>
                        <div className="paswInput">
                            <i id="eyeIcon" onClick={() => setHide(!hide)} className={hide ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                            <input id="form-input" type={hide ? "password" : "text"} name="passwrd" onInput={(e) => setPassword(e.target.value)} placeholder="Enter Password:"/>
                        </div>
                        <label htmlFor="passwrd">Confirm Password: </label>
                        <div className="paswInput">
                            <i id="eyeIcon" onClick={() => setHide(!hide)} className={hide ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                            <input id="form-input" className={passMatch ? "pass-good" : "pass-error"} type={hide ? "password" : "text"} name="passwrd" onInput={(e) => checkPassword(e)} placeholder="Confirm Password:"/>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="btn" type="submit">Signup</button>
                        <button type="button" className="btn" id="lgn" onClick={() => navigate("/login")}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;