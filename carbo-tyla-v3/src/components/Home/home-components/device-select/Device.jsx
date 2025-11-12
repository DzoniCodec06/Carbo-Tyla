import React, { useEffect } from "react";
import { useState } from "react";

import { auth, firestore } from "../../../../../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

import "./Device.css";

const Device = ({ number, selected }) => {
    const [state, setState] = useState(false);
    const [data, setData] = useState(null);

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

    const handleState = async () => {
        const newState = !state;
        setState(newState);
        selected(newState);

        let n = data?.spidersNumber == 0 ? 1 : data?.spidersNumber;

        const userRef = doc(firestore, "users", localStorage.getItem("userToken"));

        //const currentSpyder = `spyder-${n}`;

        try {
            await updateDoc(userRef, {
                [`spiders.spyder-${n}.deviceName`]: "Carbo-Tyla-Spyder-0",
                [`spiders.spyder-${n}.deviceIp`]: "192.168.10.0"
                //spiders: arrayUnion(`spyder-${n}.deviceName: Carbo-Tyla-Spyder-0`, `spyder-${n}.deviceIp: 192.168.10.0`),
            });
            //console.log("Firestore updated successfully:", updatedSpiders);
        } catch (err) {
            console.error(err); 
        }
    }

    return(
        <div className="device" onClick={handleState}>
            <p className="name">Carbo-Tyla-Spider-0{number}</p>
            <div className="brd" id="dvcBrd"></div>
            <p className="ip">192.168.10.0{number}</p>
        </div>
    )
}

export default Device;  