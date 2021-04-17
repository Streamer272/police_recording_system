async function postRequest(url, data) {
    return new Promise((resolve, reject) => {
        const xml = new XMLHttpRequest();
        xml.open("POST", url);

        xml.onreadystatechange = function() {
            if (xml.readyState === XMLHttpRequest.DONE && xml.responseText) {
                resolve(JSON.parse(xml.response));
            }
        }

        xml.onerror = function() {
            reject(null);
        }

        xml.send(data);
    });
}


export { postRequest };
