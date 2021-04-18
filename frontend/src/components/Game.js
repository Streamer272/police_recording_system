import 'bootstrap/dist/css/bootstrap.css';
import { postRequest } from "../utilities/request";

const Game = () => {
    function fetchCarSpeed() {
        postRequest("http://localhost:5000/get_model_speed", {model:
            document.getElementById("model").value}).then(value => {
            document.getElementById("max-speed").innerHTML = "Max Speed: " + value.speed;
        });
    }

    return (
        <div>
            <div className="row">
                <select name="model" id="model" className="col-1" onChange={ fetchCarSpeed }>
                    <option value="felicia">Felicia</option>
                    <option value="cybertruck">Cybertruck</option>
                    <option value="ferrari">Ferrari SF21</option>
                    <option value="citroen">Citroen SM</option>
                    <option value="bugatti">Bugatti Bolide</option>
                </select>

                <h5 id="max-speed">Max Speed: unknown</h5>
            </div>
        </div>
    )
}

export { Game };
