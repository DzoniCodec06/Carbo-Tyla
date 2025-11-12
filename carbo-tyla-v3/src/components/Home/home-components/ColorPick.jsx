import { useEffect, useState } from "react";

import ColorButton from "./ColorButton";

import "../Home.css";


const ColorPick = ({ backState, activated }) => {
    const [back, setBack] = useState(false);
    const [active, setActive] = useState(false);
    const colors = ["Black", "Carbon", "White", "Red", "Green", "Blue", "Yellow"];

    const handleBack = () => {
        let newState = !back;
        setBack(newState);

        backState(newState);
    }

    const handleActive = (sts) => {
        let newState = sts;
        setActive(newState);
        activated(newState);
        useEffect(() => {
            setActive(false);
        }, []);
    }


    return(
        <div className="color-pick">
            <header>
                <h1 className="color-pick-title">Add Spyder / <p className="thin-title">Select Color </p></h1>
                <button className="logout-btn" onClick={handleBack}>Back</button>
            </header>
            <div className="color-list">
                {colors.map((clr, index) => {
                   return <ColorButton key={index} index={index} color={clr} activeState={handleActive} />
                })}
            </div>
        </div>
    )
}

export default ColorPick;