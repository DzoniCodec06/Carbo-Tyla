import React, { useState, useEffect } from "react";

import { auth, firestore } from "../../../../firebase";
import { doc, getDoc, updateDoc, increment, arrayUnion } from "firebase/firestore";

import "../Home.css";

const ColorButton = ({ index, color, activeState }) => {
    const [state, setState] = useState(false);
    const [data, setData] = useState(null);
    const [spyderNumbers, setSpyderNumbers] = useState(0);

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

    useEffect(() => {
        if (data?.spidersNumber) {
            setSpyderNumbers(data.spidersNumber);
        }
    }, [data]); // Only updates when `data` changes

    const changeAcitveState = async (e) => {
        if (!data) return; // Ensure user data is loaded before updating
    
        const currentColor = e.currentTarget.id;
        const newSpyderNumber = spyderNumbers + 1; // Ensure it's a number
    
        // Ensure `spiders` object exists
        const existingSpiders = data.spiders || {};
    
        // Create new spiders object
        const updatedSpiders = {
            ...existingSpiders, 
            [`spyder-${newSpyderNumber}`]: { spyderColor: currentColor } 
        };
    
        // Firestore document reference
        const userRef = doc(firestore, "users", localStorage.getItem("userToken"));
    
        try {
            // Update Firestore
            await updateDoc(userRef, {
                spidersNumber: newSpyderNumber,
                [`spiders.spyder-${newSpyderNumber}.spyderColor`]: `${currentColor}`
                //spiders: {
                  //  [`spyder-${newSpyderNumber}`]: { spyderColor: currentColor } // Ensure Firestore updates the correct field
                //}
            });
            console.log("Firestore updated successfully:", updatedSpiders);
        } catch (error) {
            console.error("Error updating Firestore:", error);
        }
    
        setState(!state); // Update local UI state
        activeState(!state);

        setTimeout(() => {
            setState(false);
        }, 500);
    };

    return(
        <div key={index} className="color-button-wrapper">
            <div id={color == "Carbon" ? "carbon" : color} className={state ? "color-button active" : "color-button"} onClick={changeAcitveState}>
                <h1>{color}</h1>
                <div id="colorPreview" className={color}></div>
            </div>
        </div>
    )
}

export default ColorButton;