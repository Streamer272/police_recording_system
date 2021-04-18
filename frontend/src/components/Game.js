import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { init as alertInit, alert } from "../utilities/alert";
import { postRequest } from "../utilities/request";

const Game = ({ setNotification, getBillsForSpeed }) => {
    function fetchCarSpeed() {
        postRequest("http://localhost:5000/get_model_speed", {model:
            document.getElementById("model").value}).then(value => {
            document.getElementById("max-speed").innerHTML = "Max Speed: " + value.speed;
        });
    }

    function go() {
        const speed = parseInt(document.getElementById("speed").value);
        const maxSpeed = parseInt(document.getElementById("max-speed").innerHTML.replace("Max Speed: ", ""));

        if (isNaN(speed)) {
            // noinspection JSIgnoredPromiseFromCall
            alert("Please enter a number!");
            return null;
        }

        if (speed > maxSpeed) {
            // noinspection JSIgnoredPromiseFromCall
            alert("Your car cannot go that fast!");
            return null;
        }

        getBillsForSpeed(speed).then(value => {
            // noinspection JSIgnoredPromiseFromCall
            alert("You would have to pay " + value.bills);
        });
    }
    
    useEffect(function () {
        fetchCarSpeed();
        alertInit(setNotification);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="row w-50 mt-2 d-block">
                <select name="model" id="model" className="col-2 mx-4 d-inline-block" onChange={ fetchCarSpeed }>
                    <option value="felicia">Felicia</option>
                    <option value="cybertruck">Cybertruck</option>
                    <option value="ferrari">Ferrari SF21</option>
                    <option value="citroen">Citroen SM</option>
                    <option value="bugatti">Bugatti Bolide</option>
                </select>

                <h5 id="max-speed" className="d-inline-block">Max Speed: unknown</h5>

                <br />

                <h4>Please enter speed you want to go with: </h4>
                <input placeholder="69" id="speed" className="mx-2" />
                <button className="btn btn-primary" onClick={ go }>Go!</button>
            </div>
        </div>
    )
}

export { Game };
