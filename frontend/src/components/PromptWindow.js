import 'bootstrap/dist/css/bootstrap.css';

const PromptWindow = ({ setNotification, message, doneCallback }) => {
    function close() {
        setNotification(<div style={{zIndex: "1060"}} />);
        doneCallback(null);
    }

    function submit() {
        setNotification(<div style={{zIndex: "1060"}} />);
        doneCallback(document.getElementById("prompt-input").value);
    }

    return (
        <div className="shadow bg-white rounded w-25 fixed-top mx-auto mt-2" id="prompt" style={{zIndex: "1060"}}>
            <h4 className="w-100 text-center my-2" style={{fontFamily: "normal"}}>{ message }</h4>
            <br />
            <div className="d-flex align-items-center justify-content-center m-0 rounded">
                <input className="d-inline w-50 mx-auto my-2" style={{fontFamily: "normal"}} id="prompt-input" placeholder="Enter a value..." />
            </div>
            <br />
            <button className="w-25 float-right btn btn-primary" onClick={ submit }>Ok</button>
            <button className="w-25 float-right btn btn-secondary" onClick={ close }>Close</button>
        </div>
    );
}

export { PromptWindow };
