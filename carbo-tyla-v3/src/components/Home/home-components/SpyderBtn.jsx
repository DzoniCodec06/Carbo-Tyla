import { useNavigate } from "react-router-dom";

const SpyderBtn = ({ index, spyderName, spyderColor }) => {

    const navigate = useNavigate();

    const navToControllCenter = () => {
        navigate("/control-center");
        console.log(`Spyder name: ${spyderName} | Spyder color: ${spyderColor}`);
    }
    /*
    return(
        <div key={index} className="spyder-btn" onClick={() => navigate("/control-center")}>
            <h1 className="spyder-name">{spyderName}</h1>
            {spyderColor == "carbon" ? <img src="./images/spyder.png"></img> : <p className="spyder-color">{spyderColor}</p> }
        </div>
    )*/
    return(
        <div key={index} className="spyder-btn" onClick={() => navigate("/control-center")}>
            <h1 className="spyder-name">{spyderName}</h1>
            {spyderColor == "carbon" ? <img src="./images/spyder.png"></img> : <p className="spyder-color">{spyderColor}</p> }
        </div>
    )
}

export default SpyderBtn;