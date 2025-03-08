import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../utils/auth";
import { useState, useEffect } from "react";
import { auth } from "../../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

import "../Home.css"

const HomeOverview = ({ menuState }) => {
    const [user, setUser] = useState(null);
    const [colorMenu, setColorMenu] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
    })

    const navigate = useNavigate();

    const logOut = () => {
        logoutUser();
        //alert("Logout Succesfully");
        navigate("/login");
        location.reload();
    }

    const changeState = () => {
        const newValue = !colorMenu;
        setColorMenu(colorMenu);

        menuState(newValue);
    }

    return(
        <div className="home-container">
            <header>
                <h1>Welcome, {user ? user.displayName : "Unknown"}</h1>
                <button className="logout-btn" onClick={logOut}>Logout</button>
            </header>
            <div className="addBtnField">
                <div className="addBtn" onClick={changeState}>
                    <h1>+</h1>
                    <p>Add Spider</p>
                </div>
            </div>
        </div>
    )
}

export default HomeOverview;