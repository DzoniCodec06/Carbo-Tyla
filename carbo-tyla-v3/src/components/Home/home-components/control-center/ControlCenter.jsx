import { useEffect, useState } from "react";

import { Canvas } from "@react-three/fiber";

import { useNavigate } from "react-router-dom";

//import { auth, firestore, db } from "../../../../../firebase";
//import { doc, getDoc } from "firebase/firestore";

import "./ControlStyle.css";

import Loading from "../../../Loading/Loading";
import Scene from "./Scene";

const ControlCenter = ({ controlState }) => {
    const [back, setBack] = useState(false);
    const [value_s1, setValue_s1] = useState(50); // Default value
    const [value_s2, setValue_s2] = useState(50); // Default value
    const [value_s3, setValue_s3] = useState(50); // Default value
    const [value_s4, setValue_s4] = useState(50); // Default value
    const [value_s5, setValue_s5] = useState(50); // Default value

    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    const [switchState, setSwitchState] = useState(0);

    const [loading, setLoading] = useState(true);

    const lColorInput = document.getElementById("l-eye-color");
    const rColorInput = document.getElementById("r-eye-color");

    const navigate = useNavigate();

    const [spyderColor, setSpyderColor] = useState("");

    //const [data, setData] = useState(null);
    //const [spiders, setSpiders] = useState({});
    /*
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
    }, []);

    useEffect(() => {
        if (!data?.spiders) return;
        setSpiders(data.spiders || {});
    }, [data]);


    useEffect(() => {
        if (!spiders) return;
        console.log(spiders);
    }, [spiders]);
    */
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    });

    useEffect(() => {
        const ws = new WebSocket('ws://192.168.1.7:81');

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
            setSocket(ws);
        };

        ws.onmessage = (event) => {
            console.log('Message from server:', event.data);
            setMessages((prev) => [...prev, event.data]);
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Clean up the connection on unmount
        return () => ws.close();
    }, []);

    if (loading) {
        return <Loading />
    }

    const updateRange = (e) => {
        const newValue = e.currentTarget.value;
        if (e.currentTarget.id == "s1") {
            setValue_s1(newValue);
            socket.send(`m1,${value_s1}\n`);
        } else if (e.currentTarget.id == "s2") {
            setValue_s2(newValue);
            socket.send(`m2,${value_s2}\n`);
        } else if (e.currentTarget.id == "s3") {
            setValue_s3(newValue);
            socket.send(`m3,${value_s3}\n`);
        } else if (e.currentTarget.id == "s4") {
            setValue_s4(newValue);
            socket.send(`m4,${value_s4}\n`);
        } else if (e.currentTarget.id == "s5") {
            setValue_s1(newValue);
            setValue_s2(newValue);
            setValue_s3(newValue);
            setValue_s4(newValue);
            setValue_s5(newValue);
            socket.send(`${value_s1},${value_s2},${value_s3},${value_s4}\n`);
        } 
    };

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
                <button className="logout-btn" onClick={() => navigate("/")}>Home</button>
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
                    { /*<img src="./images/spyder.png" id="spyder"/> */ }        {/*    Canavas goes here   */}
                    <Canvas className="canv" style={{width: "400px", height: "500px"}}>
                        <Scene color={spyderColor}/>
                    </Canvas>
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