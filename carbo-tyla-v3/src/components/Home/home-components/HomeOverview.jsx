import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../utils/auth";
import { useState, useEffect } from "react";
import { auth, firestore, db } from "../../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import SpyderBtn from "./SpyderBtn";

import "../Home.css"

const HomeOverview = ({ menuState }) => {
    const [user, setUser] = useState(null);
    const [homeState, setHomeState] = useState(false);
    const [data, setData] = useState(null);
    const [spiders, setSpiders] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })

        return () => unsubscribe();
    })

    useEffect(() => {
        const fetchDoc = async () => {
            try {
                const docRef = doc(firestore, "users", localStorage.getItem("userToken"));
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setData(docSnap.data());
                } else {
                    console.log("No such document!");
                } 
            } catch (err) {
                console.error(err);
            }
        }

        fetchDoc();
    }, [])

    const navigate = useNavigate();

    const logOut = () => {
        logoutUser();
        //alert("Logout Succesfully");
        navigate("/login");
        location.reload();
    }

    const changeState = () => {
        const newValue = true;
        setHomeState(newValue);
        menuState(true);
    }

    useEffect(() => {
        if (!data?.spiders) return;
        setSpiders(data.spiders || {}); // Ensure it's always an object
        //Object.keys(spidersObjects).forEach(spyder => {})
        /*
        const timeout = setTimeout(() => {
            setSpiders(prevSpiders => ({
                ...prevSpiders,
                ...spidersObjects,  
            }))
        }, 1000); */

        // Clean up timeout on component unmount or dependency change
        //return () => clearTimeout(timeout);
    }, [data]);


    useEffect(() => {
        if (!spiders) return;
        console.log(spiders);
    }, [spiders]);

    return(
        <div className="home-container">
            <header>
                <h1>Welcome, {user ? user.displayName : "Unknown"}</h1>
                <button className="logout-btn" onClick={logOut}>Logout</button>
            </header>
            <div className="spyders">
                <div className="addBtn" onClick={changeState}>
                    <h1>+</h1>
                    <p>Add Spyder</p>
                </div>
                {   
                    spiders && Object.keys(spiders)
                    .sort((a, b) => {
                        const numA = parseInt(a.split("-")[1]); // Extract number (e.g., "1" from "spyder-1")
                        const numB = parseInt(b.split("-")[1]); 
                        return numA - numB; // Sort numerically
                    })
                    .map(spyder => (
                       <SpyderBtn key={spyder} spyderColor={spiders[spyder].spyderColor} spyderName={spyder}/>
                    ))
                }
            </div>
        </div>
    )
}

export default HomeOverview;