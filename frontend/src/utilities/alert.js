import { AlertWindow } from "../components/AlertWindow";

let setNotification;

function init(setNotification_) {
    setNotification = setNotification_;
}

async function alert(message) {
    return new Promise((resolve, reject) => {
        function doneCallback(value) {
            if (value) {
                resolve(value);
            }
            else {
                reject(value);
            }
        }

        setNotification(<AlertWindow setNotification={ setNotification } message={ message } doneCallback={ doneCallback } />);
    });
}

export { init, alert };
