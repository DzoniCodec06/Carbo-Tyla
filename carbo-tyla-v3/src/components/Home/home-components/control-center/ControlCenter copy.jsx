import { useEffect, useState } from "react";

import "./ControlStyle.css";

const ControlCenter = ({ controlState }) => {
    const [back, setBack] = useState(false);
    const [value_s1, setValue_s1] = useState(50); // Default value
    const [value_s2, setValue_s2] = useState(50); // Default value
    const [value_s3, setValue_s3] = useState(50); // Default value
    const [value_s4, setValue_s4] = useState(50); // Default value
    const [value_s5, setValue_s5] = useState(50); // Default value

    const [switchState, setSwitchState] = useState(0);

    const lColorInput = document.getElementById("l-eye-color");
    const rColorInput = document.getElementById("r-eye-color");

    const updateRange = (e) => {
        const newValue = e.currentTarget.value;
        if (e.currentTarget.id == "s1") {
            setValue_s1(newValue);
        } else if (e.currentTarget.id == "s2") {
            setValue_s2(newValue);
        } else if (e.currentTarget.id == "s3") {
            setValue_s3(newValue);
        } else if (e.currentTarget.id == "s4") {
            setValue_s4(newValue);
        } else if (e.currentTarget.id == "s5") {
            setValue_s1(newValue);
            setValue_s2(newValue);
            setValue_s3(newValue);
            setValue_s4(newValue);
            setValue_s5(newValue);
        } 
    };

    const handleBack = () => {
        let newState = !back;
        setBack(newState);

        controlState(newState);
    }

    useEffect(() => {
        
    })

    const handleLeftColor = () => {
        lColorInput.click();
    }

    const handleRightColor = () => {
        rColorInput.click();
    }

    const handleSwitch = () => {
        setSwitchState(!switchState);
    }

    return(
        <div className="interface-container">
           <header>
                <h1 className="color-pick-title">Work Station</h1>
                <button className="logout-btn" onClick={handleBack}>Home</button>
            </header>
            <div className="work-station">
                <div className="side">
                    <div className="eye">
                        <img src="./images/l-eye.png" alt="left-eye" draggable={false} onClick={handleLeftColor} className="eye-img"/>    
                        <input type="color" id="l-eye-color" />
                    </div>
                    <div className="block">
                        <p className="dtm-title">Date & Time</p>
                        <div className="date-inputs">
                            <div className="start">
                                <p className="subtitle">Start: </p>
                                <input type="date" />
                                <input type="time" />
                            </div>
                            <div className="end">
                                <p className="subtitle">End: </p>
                                <input type="date" />
                                <input type="time" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="central">
                    <img src="./images/spyder.png" id="spyder"/>
                    <div className="down">
                        <div className="fan-sliders">
                            <div className={switchState ? "overlay" : "hide"}></div>
                            <div className="vertical">
                                <div className="fan-slider">
                                    <img src="./images/fan_white_transparent.png" id="fan" draggable={false}/>
                                    <input type="range" id="s1" onInput={updateRange} style={{ "--progress": `${(value_s1 / 100) * 100}%` }}/>
                                </div>
                                <div className="fan-slider">
                                    <img src="./images/fan_white_transparent.png" id="fan" draggable={false}/>
                                    <input type="range" id="s2" onInput={updateRange} style={{ "--progress": `${(value_s2 / 100) * 100}%` }}/>
                                </div>
                                <div className="fan-slider">
                                    <img src="./images/fan_white_transparent.png" id="fan" draggable={false}/>
                                    <input type="range" id="s3" onInput={updateRange} style={{ "--progress": `${(value_s3 / 100) * 100}%` }}/>
                                </div>
                                <div className="fan-slider">
                                    <img src="./images/fan_white_transparent.png" id="fan" draggable={false}/>
                                    <input type="range" id="s4" onInput={updateRange} style={{ "--progress": `${(value_s4 / 100) * 100}%` }}/>
                                </div>
                            </div>
                            <div className="horizontal">
                                <div className="fan-slider">
                                    <img src="./images/fan_white_transparent.png" id="fan" draggable={false}/>
                                    <input type="range" id="s5" onInput={updateRange} style={{ "--progress": `${(value_s5 / 100) * 100}%` }}/>
                                </div>
                            </div>
                        </div>
                        <div className="block" id="modeBar">
                            <p className="dtm-title">Mode: Manual</p>
                            <label className="switch">
                                <input type="checkbox" id="l-switch" value="0" onInput={handleSwitch}/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="side">
                    <div className="eye">
                        <img src="./images/r-eye.png" alt="right-eye" draggable={false} onClick={handleRightColor} className="eye-img"/>
                        <input type="color" id="r-eye-color"/>
                    </div>
                    <div className="block">
                        <p className="dtm-title">Air Quality:</p>
                        <div className="values">
                            <p id="value">50%</p>
                            <div className="bar">
                                <img src="./images/trg.png" />
                                <img src="./images/color-bar.png" className="bar-info" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ControlCenter;