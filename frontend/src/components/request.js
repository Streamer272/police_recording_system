async function getRequest(url) {
    return new Promise((resolve, reject) => {
        const xml = new XMLHttpRequest();
        xml.open("GET", url);

        xml.onreadystatechange = function() {
            if (xml.status < 400) {
                resolve(xml.responseText);
            }
            else {
                reject(xml.responseText);
            }
        }

        xml.send();
    });
}

async function postRequest(url, data) {
    return new Promise((resolve, reject) => {
        const xml = new XMLHttpRequest();
        xml.open("POST", url);

        xml.onreadystatechange = function() {
            if (xml.responseText) {
                if (xml.status < 300) {
                    resolve(xml.responseText);
                }
                else {
                    reject(xml.responseText);
                }
            }
        }

        xml.send(data);
    });
}


export { getRequest, postRequest };
