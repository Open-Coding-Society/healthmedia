export const baseurl = "/healthmedia";

export var pythonURI;
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    pythonURI = "http://localhost:8891";  // Local dev server
} else {
    pythonURI = "https://healthmedia.opencodingsociety.com";  // Deployed backend
}

export var javaURI;
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    javaURI = "http://localhost:8085";
} else {
    javaURI = "https://healthmedia.opencodingsociety.com";
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
