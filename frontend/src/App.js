import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { prompt, alert } from "./components/prompt";
import { postRequest } from "./components/request";


const App = () => {
    let [notification, setNotification] = useState(<div />);

    async function getBillsForSpeed(speed) {
        // noinspection JSCheckFunctionSignatures
        let money;
        await postRequest("http://localhost:5000/get_bills", JSON.stringify({"speed": speed})).then(value => {
            money = value;
        });

        console.log(money);

        // if (isNaN(money)) {
        //     await alert("Server must be running!", setNotification);
        // }
        // else {
        //     await postRequest("http://localhost:5000/add_record", {
        //         name: "unknown",
        //         "speed": speed,
        //         "money": money
        //     });
        // }

        return money;
    }

    async function onload() {
        let speed;

        await prompt("What was your speed?", setNotification).then(value => {
            // noinspection JSCheckFunctionSignatures
            speed = parseInt(value);
        });


        if (isNaN(speed)) {
            await alert("Please enter a number!", setNotification).then(() => {});
            await onload();
        }
        else {
            const bills = await getBillsForSpeed(speed);

            if (bills > 0) {
                await alert("You would have to pay " + bills, setNotification);
            }
        }
    }

    window.onload = onload;

    // TODO: make this a GAME not a boring alerts and prompts

    return (
        <div>
            { notification }
        </div>
    );
}

export { App };
