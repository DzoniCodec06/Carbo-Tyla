import React, { useState } from "react";

import "../Home.css";

const ColorButton = ({ index, color, activeState }) => {
    const [state, setState] = useState(false);

    const changeAcitveState = () => {
        let newState = !state;
        setState(newState);
        activeState(newState);
    }

    return(
        <div key={index} className="color-button-wrapper">
            <div id={color == "Carbon" ? "carbon" : ""} className={state ? "color-button active" : "color-button"} onClick={changeAcitveState}>
                <h1>{color}</h1>
                <div id="colorPreview" className={color}></div>
            </div>
        </div>
    )
}

export default ColorButton;