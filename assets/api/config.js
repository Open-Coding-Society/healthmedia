export const baseurl = "/healthmedia";

export var pythonURI;
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    pythonURI = "http://localhost:8402";  // Use port 8402 here as you requested
} else {
    pythonURI = "https://flask2025.nighthawkcodingsociety.com";
}

export var javaURI;
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    javaURI = "http://localhost:8085";
} else {
    javaURI = "https://spring2025.nighthawkcodingsociety.com";
}

export const fetchOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'X-Origin': 'client'
    },
};

const config = {
    API_BASE_URL: pythonURI
};

export default config;

export function login(options) {
    const requestOptions = {
        ...fetchOptions,
        method: options.method || 'POST',
        body: options.method === 'POST' ? JSON.stringify(options.body) : undefined
    };

    document.getElementById(options.message).textContent = "";

    fetch(options.URL, requestOptions)
        .then(response => {
            if (!response.ok) {
                const errorMsg = 'Login error: ' + response.status;
                console.log(errorMsg);
                document.getElementById(options.message).textContent = errorMsg;
                return;
            }
            options.callback();
        })
        .catch(error => {
            console.log('Possible CORS or Service Down error: ' + error);
            document.getElementById(options.message).textContent = 'Possible CORS or service down error: ' + error;
        });
}
