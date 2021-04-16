import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { prompt, alert } from "./components/prompt";

const App = () => {
    let [notification, setNotification] = useState(<div />);

    window.onload = function() {
        prompt("What was your speed?", setNotification).then(value => {
            console.log(value);
        });
    }

    // TODO: make this a GAME not a boring alerts and prompts

    return (
        <div>
            { notification }
        </div>
    );
}

export { App };
