import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { init as prompt_init, prompt } from "./utilities/prompt";
import { init as alert_init, alert } from "./utilities/alert";
import { postRequest } from "./utilities/request";


const App = () => {
    let [notification, setNotification] = useState(<div />);

    async function getBillsForSpeed(speed) {
        // noinspection JSCheckFunctionSignatures
        let bills;
        // this si actually a GET request but my server doesnt work right so i have to do it this way
        await postRequest("http://localhost:5000/get_bills", JSON.stringify({"speed": speed})).then(value => {
            bills = value;
        });

        // noinspection JSUnresolvedVariable
        return bills;
    }

    async function add_record(name, speed, bills) {
        const body = {
            name: name,
            speed: speed,
            bills: bills
        }

        await postRequest("http://localhost:5000/add_record", JSON.stringify(body)).then(value => {
            return value.state;
        });
    }

    async function onload() {
        let speed;

        prompt_init(setNotification);
        alert_init(setNotification);

        await prompt("What was your speed?").then(value => {
            // noinspection JSCheckFunctionSignatures
            speed = parseInt(value);
        });

        if (isNaN(speed)) {
            await alert("Please enter a number!");
            await onload();
            return null;
        }
        else {
            const bills = await getBillsForSpeed(speed);

            // noinspection JSUnresolvedVariable
            if (bills.removeDI) {
                await alert("Your driving license would be removed!");
            }
            else {
                // noinspection JSUnresolvedVariable
                await alert("You would have to pay " + bills.bills);
            }

            add_record("unknown", speed, bills);
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
