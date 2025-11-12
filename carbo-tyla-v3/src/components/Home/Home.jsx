import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Loading from "../Loading/Loading";

import HomeOverview from "./home-components/HomeOverview";
import ColorPick from "./home-components/ColorPick";

import SelectDevice from "./home-components/device-select/SelectDevice";

import ControlCenter from "./home-components/control-center/ControlCenter";

import "./Home.css"

const Home = () => {
    const [colorMenu, setColorMenu] = useState(false);
    const [deviceMenu, setDeviceMenu] = useState(false);
    const [interfaceMenu, setInterfaceMenu] = useState(false);
    const [homeState, setHomeState] = useState(true);

    const [loading, setLoading] = useState(true);
    const [back, setBack] = useState(false);   
    const [backDevice, setBackDevice] = useState(false);   
    const [controlBack, setControlBack] = useState(false);   

    const navigate = useNavigate();

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
        setHomeState(!state);
    }

    const handleBackState = (state) => {
        setBack(state);
    }

    const handleBackDeviceMenu = (state) => {
        setBackDevice(state);
    }

    const handleControlBack = (state) => {
        setControlBack(state);
    }

    const handleActivated = (state) => {
        setDeviceMenu(state);
        setColorMenu(!state);
    }

    const hadnleInterfaceMenu = (state) => {
        setInterfaceMenu(state);
        setDeviceMenu(!state);
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
    } else if (interfaceMenu && controlBack) {
        setInterfaceMenu(false);
        setControlBack(false);
        return <HomeOverview menuState={handleMenuState} />
    } else if (colorMenu && deviceMenu && interfaceMenu) {
        setColorMenu(false);
        setDeviceMenu(false);
        setInterfaceMenu(false);
        setHomeState(true);
    } 

    return(
        <div className="home">
            {homeState ? <HomeOverview menuState={handleMenuState}/> : colorMenu ? <ColorPick backState={handleBackState} activated={handleActivated}/> : deviceMenu ? <SelectDevice backState={handleBackDeviceMenu} passSelected={hadnleInterfaceMenu}/> : navigate("/control-center")}
        </div>
    )
}

export default Home;