import { PromptWindow } from "../components/PromptWindow";


let setNotification;

function init(setNotification_) {
    setNotification = setNotification_;
}

async function prompt(message) {
    return new Promise((resolve, reject) => {
        function doneCallback(value) {
            if (value) {
                resolve(value);
            }
            else {
                reject(value);
            }
        }
        setNotification(<PromptWindow setNotification={ setNotification } message={ message } doneCallback={ doneCallback } />);
    });
}

export { init, prompt };
