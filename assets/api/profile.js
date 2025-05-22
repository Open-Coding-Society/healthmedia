import {fetchOptions, pythonURI } from './config.js';



// Update User Data with "Put"
export function putUpdate(options) {
    // Modify the options to use the PUT method and include the request body.
    const requestOptions = {
        ...fetchOptions, // This will copy all properties from options
        method: 'PUT', // Override the method property
        cache: options.cache, // Set the cache property
        body: JSON.stringify(options.body)
    };

    // Clear the message area

    // Send PUT request
    fetch(options.URL, requestOptions)
        .then(response => {
            // Trap error response from Web API
            if (!response.ok) {
                const errorMsg = 'Error: ' + response.status;
                console.log(errorMsg);
                return;
            }
            // Success!!!
            // Call the callback function
            options.callback();
        })
        .catch(error => {
            // Handle network errors
            console.log('Possible CORS or Service Down error: ' + error);
           
        });
}
// Update User Data with "POST" 
export function postUpdate(options) {
    // Modify the options to use the POST method and include the request body.
    const requestOptions = {
        ...fetchOptions, // This will copy all properties from options
        method: 'POST', // Override the method property
        cache: options.cache, // Set the cache property
        body: JSON.stringify(options.body)
    };

    // Clear the message area
    document.getElementById(options.message).textContent = "";

    // Send POST request
    fetch(options.URL, requestOptions)
        .then(response => {
            // Trap error response from Web API
            if (!response.ok) {
                const errorMsg = 'Error: ' + response.status;
                console.log(errorMsg);
                document.getElementById(options.message).textContent = errorMsg;
                return;
            }
            // Success!!!
            // Call the callback function
            options.callback();
        })
        .catch(error => {
            // Handle network errors
            console.log('Possible CORS or Service Down error: ' + error);
           
        });
}

export function deleteData(options)  {
    // Modify the options to use the DELETE method and include the request body.
    const requestOptions = {
        ...fetchOptions, // This will copy all properties from options
        method: 'DELETE', // Override the method property
        cache: options.cache, // Set the cache property
        body: JSON.stringify(options.body) // Include the request body
    };

    // Clear the message area

    // Send DELETE request
    fetch(options.URL, requestOptions)
        .then(response => {
            // Trap error response from Web API
            if (!response.ok) {
                const errorMsg = 'Error: ' + response.status;
                console.log(errorMsg);
                return;
            }
            // Success!!!
            // Call the callback function
            options.callback();
        })
        .catch(error => {
            // Handle network errors
            console.log('Possible CORS or Service Down error: ' + error);
            
        });

    }
export async function logoutUser() {
        const URL = pythonURI + '/api/authenticate'; // Adjusted endpoint for logout
        
         const options = {
                ...fetchOptions,
                method: 'DELETE',
            };
         
         
            console.log('Logout clicked');
         
         
        try {
                const response = await fetch(URL, options);
                if (response.ok) {
                    window.location.href = "/portfolio_2025/login"; // Redirect to login page
                } else {
                    const errorMessage = await response.text();
                    console.error('Logout failed:', errorMessage);
                    // Optionally display an error message to the user
                }
            } catch (error) {
                console.error('Error during logout:', error.message);
                // Optionally display an error message to the user
            }
         }

         import {fetchOptions, pythonURI } from './config.js';

// Update User Data with "Put"
export function putUpdate(options) {
    const requestOptions = {
        ...fetchOptions,
        method: 'PUT',
        cache: options.cache,
        body: JSON.stringify(options.body)
    };

    fetch(options.URL, requestOptions)
        .then(response => {
            if (!response.ok) {
                const errorMsg = 'Error: ' + response.status;
                console.log(errorMsg);
                return;
            }
            options.callback();
        })
        .catch(error => {
            console.log('Possible CORS or Service Down error: ' + error);
        });
}

// Update User Data with "POST" 
export function postUpdate(options) {
    const requestOptions = {
        ...fetchOptions,
        method: 'POST',
        cache: options.cache,
        body: JSON.stringify(options.body)
    };

    // Clear the message area
    if (options.message && document.getElementById(options.message)) {
        document.getElementById(options.message).textContent = "";
    }

    fetch(options.URL, requestOptions)
        .then(response => {
            if (!response.ok) {
                const errorMsg = 'Error: ' + response.status;
                console.log(errorMsg);
                if (options.message && document.getElementById(options.message)) {
                    document.getElementById(options.message).textContent = errorMsg;
                }
                return;
            }
            options.callback();
        })
        .catch(error => {
            console.log('Possible CORS or Service Down error: ' + error);
        });
}

export function deleteData(options) {
    const requestOptions = {
        ...fetchOptions,
        method: 'DELETE',
        cache: options.cache,
        body: JSON.stringify(options.body)
    };

    fetch(options.URL, requestOptions)
        .then(response => {
            if (!response.ok) {
                const errorMsg = 'Error: ' + response.status;
                console.log(errorMsg);
                return;
            }
            options.callback();
        })
        .catch(error => {
            console.log('Possible CORS or Service Down error: ' + error);
        });
}

// FIXED LOGOUT FUNCTION
export async function logoutUser() {
    const URL = pythonURI + '/logout'; // Use the correct logout endpoint
    
    try {
        const response = await fetch(URL, {
            method: 'GET', // Your Flask logout route uses GET
            credentials: 'include'
        });
        
        if (response.ok) {
            // Clear local storage
            localStorage.removeItem('authenticated');
            // Redirect to login page
            window.location.href = "/healthmedia/login";
        } else {
            console.error('Logout failed:', response.status);
        }
    } catch (error) {
        console.error('Error during logout:', error.message);
    }
}

// ADD MISSING FUNCTIONS THAT profile.md expects:

// Function to fetch UID from backend
export async function fetchUid() {
    const URL = pythonURI + "/api/id";

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch UID: ${response.status}`);
        }

        const data = await response.json();
        return data.uid;
    } catch (error) {
        console.error('Error fetching UID:', error.message);
        return null;
    }
}

// Function to fetch Name from backend
export async function fetchName() {
    const URL = pythonURI + "/api/id";

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch Name: ${response.status}`);
        }

        const data = await response.json();
        return data.name;
    } catch (error) {
        console.error('Error fetching Name:', error.message);
        return null;
    }
}

// session
// asynchronous session response
//session call api----?
// then--> javascript promise
// data loaded
// screen establishes 5 different sessions
// talk about play
// iteration style ----> little pieces
// Your teacher likes to iterate -->