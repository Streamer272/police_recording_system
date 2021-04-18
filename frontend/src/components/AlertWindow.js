import 'bootstrap/dist/css/bootstrap.css';

const AlertWindow = ({ setNotification, message, doneCallback }) => {
    function close() {
        setNotification(<div style={{zIndex: "1060"}} />);
        doneCallback(null);
    }

    function submit() {
        setNotification(<div style={{zIndex: "1060"}} />);
        doneCallback("Ok");
    }

    return (
        <div className="shadow bg-white rounded w-25 fixed-top mx-auto mt-2" style={{zIndex: "1060"}}>
            <h4 className="w-100 text-center my-4" style={{fontFamily: "normal"}}>{ message }</h4>
            <button className="w-25 float-right btn btn-primary" onClick={ submit }>Ok</button>
            <button className="w-25 float-right btn btn-secondary" onClick={ close }>Close</button>
        </div>
    );
}

export { AlertWindow };
