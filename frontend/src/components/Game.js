import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Car from "../images/car.png";

const Game = () => {
    const fps = 5;
    const speedUnit = 1;

    const [speed, setSpeed] = useState(0);
    const [percentPerSpeedUnit, setPercentPerSpeedUnit] = useState(2);
    const [maxSpeed, setMaxSpeed] = useState(150);
    const [carMarginLeft, setCarMarginLeft] = useState(0);
    const [forwardKey, setForwardKey] = useState(" ");
    const [changeForwardKeyProtocol, setChangeForwardKeyProtocol] = useState(false);

    function moveForward() {
        if (speed + speedUnit > maxSpeed) {
            return null;
        }

        accelerate();
        console.log(speed);
        setTimeout(slow, 2500);
    }

    function accelerate() {
        setSpeed(speed + speedUnit);
        console.log("accelerating to " + speed);
    }

    function slow() {
        setSpeed(speed - speedUnit);
        console.log("slowing to " + speed);
    }

    function carFrame() {
        const car = document.getElementById("car");
        console.log("Speed: " + speed + ", car margin left: " + carMarginLeft + ", pixel per speed unit: " + percentPerSpeedUnit);
        const nextMargin = carMarginLeft + (speed * percentPerSpeedUnit);
        setCarMarginLeft(nextMargin);
        car.style.marginLeft = nextMargin + "px";
    }

    window.onkeypress = function (event) {
        if (changeForwardKeyProtocol) {
            setForwardKey(event.key);
            setChangeForwardKeyProtocol(false);
            return null;
        }

        if (event.key === forwardKey) {
            moveForward();
            return null;
        }
    }

    window.onload = function () {
        setInterval(carFrame, 1000 / fps);
    }

    return (
        <div className="bg-white w-100 shadow mt-auto">
            <div className="row my-2">
                <div className="d-flex align-items-center justify-content-center col-lg-10 col-md-8 col-sm-6">
                    <h2 style={{fontFamily: "normal", textAlign: "center"}}>Press "{ forwardKey }" to accelerate!</h2>
                </div>

                <button className="btn btn-secondary float-right col-lg-2 col-md-4 col-sm-6"
                        onClick={function () {setChangeForwardKeyProtocol(true);}}
                        style={{fontFamily: "normal"}}>
                    Change Forward Key</button>
            </div>

            <div className="row">
                <div className="h-25 d-flex flex-row-reverse col-12">
                    <h4 style={{fontFamily: "normal"}}>Speed: { speed }</h4>
                    <h4 className="mx-lg-4 mx-md-2 mx-sm-1" style={{fontFamily: "normal"}}>Speed per press: { speedUnit }</h4>
                    <h4 className="mr-lg-2 mr-md-1 mr-sm-0" style={{fontFamily: "normal"}}>Max speed: { maxSpeed }</h4>
                </div>
            </div>

            <div className="row my-2">
                <img src={ Car } alt="Car" style={{marginLeft: carMarginLeft + "px"}} id="car" className="border border-secondary" />
            </div>
        </div>
    )
}

export { Game };
