import { useState, useEffect } from "react";

import Loading from "../Loading/Loading";

import HomeOverview from "./home-components/HomeOverview";
import ColorPick from "./home-components/ColorPick";

import SelectDevice from "./home-components/device-select/SelectDevice";

import "./Home.css"

const Home = () => {
    const [colorMenu, setColorMenu] = useState(false);
    const [deviceMenu, setDeviceMenu] = useState(false);
    const [loading, setLoading] = useState(true);
    const [back, setBack] = useState(false);   
    const [backDevice, setBackDevice] = useState(false);   

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    });

    if (loading) {
        return <Loading />
    }

    const handleMenuState = (state) => {
        setColorMenu(state);
    }

    const handleBackState = (state) => {
        setBack(state);
    }

    const handleBackDeviceMenu = (state) => {
        setBackDevice(state);
    }

    const handleActivated = (state) => {
        setDeviceMenu(state);
        setColorMenu(!state);
    }

    if (colorMenu && back) {
        setColorMenu(false);
        setBack(false);
        return <HomeOverview menuState={handleMenuState} />
    } else if (deviceMenu && backDevice) {
        setDeviceMenu(false);
        setBackDevice(false);
        setColorMenu(true);
        return <ColorPick backState={handleBackState} activated={handleActivated}/>
    }

    return(
        <div className="home">
            {!colorMenu && !deviceMenu ? <HomeOverview menuState={handleMenuState}/> : colorMenu ? <ColorPick backState={handleBackState} activated={handleActivated}/> : <SelectDevice backState={handleBackDeviceMenu}/>}
        </div>
    )
}

export default Home;