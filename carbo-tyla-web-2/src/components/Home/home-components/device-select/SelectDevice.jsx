import { useState } from "react";

import Device from "./Device";

import "./Device.css";

const SelectDevice = ({ backState }) => {
    const [back, setBack] = useState(false);

    const handleBack = () => {
        let newState = !back;
        setBack(newState);

        backState(newState);
    }

    return(
        <div className="device-select">
            <header>
                <h1 className="color-pick-title">Add Spyder / <p className="thin-title">Select Device </p></h1>
                <button className="logout-btn" onClick={handleBack}>Back</button>
            </header>
            <div className="device-container">
                <div className="device-box">
                    <div className="device-header">
                        <h1>Select Network Device</h1>
                        <div className="device-legend">
                            <p>Name</p>
                            <div className="brd"></div>
                            <p>IP Adress</p>
                        </div>
                    </div>
                    <div className="device-list">
                        <Device />
                        <Device />
                        <Device />
                        <Device />
                        <Device />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectDevice;