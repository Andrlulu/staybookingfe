const domain = "http://localhost:8080"; // local for now, will change to production later
/**
 * Login Function - Asynchronous Flow Explanation
 * ------------------------------------------
 * 1. fetch() initiates HTTP request & immediately returns a Promise
 *    - Request happens in background (non-blocking)
 *    - networkRequestStatus holds this Promise
 * 
 * 2. .then() registers a callback function to run LATER when response arrives
 *    - Callback receives response object when network request completes
 *    - Processing waits until data is available, without blocking main thread
 * 
 * 3. Promise Chain:
 *    - Response → Status check → Parse JSON → Return data
 *    - Each step transforms data for next step
 * 
 * 4. return statement ensures the Promise chain is accessible to caller:
 *    - Allows: login().then(data => ...)
 *    - Without it, caller couldn't access results
 * 
 * This is how JS handles async operations without blocking execution!
 */
export const login = (credential) => { // talk to backend to get token
    const loginUrl = `${domain}/auth/login`;
    const networkRequestStatus = fetch(loginUrl,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credential),
        }
    ); // this is the request status
    // Return the Promise chain
    return networkRequestStatus.then((response) => { // wait for the fetch request to complete
        if (response.status >= 300) {
            throw Error("Fail to log in");
        }

        return response.json();
    });
};

export const register = (credential) => {
    const registerUrl = `${domain}/auth/register`;
    return fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    }).then((response) => {
      if (response.status >= 300) {
        throw Error("Fail to register");
      }
    });
};
export const getReservations = () => {
    const authToken = localStorage.getItem("authToken");
    const listReservationsUrl = `${domain}/bookings`;
  
  
    return fetch(listReservationsUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status >= 300) {
        throw Error("Fail to get reservation list");
      }
  
  
      return response.json();
    });
};
  
export const getStaysByHost = () => {
    const authToken = localStorage.getItem("authToken");
    const listStaysUrl = `${domain}/listings`;
  
  
    return fetch(listStaysUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status >= 300) {
        throw Error("Fail to get stay list");
      }
  
  
      return response.json();
    });
  };
  
export const getReservation = () => {
    const authToken = localStorage.getItem("authToken"); // stores the token in the local storage which is a key-value pair in the browser
    const listReservationUrl = `${domain}/bookings`;

    return fetch(listReservationUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`, // bearer is the type of the token
        },
    }).then((response) => {
        if (response.status >= 300) {
            throw Error("Fail to get reservation list");
        }
        return response.json();
    });
};

export const searchStays = (query) => {
    const authToken = localStorage.getItem("authToken");
    const searchStaysUrl = new URL(`${domain}/listings/search`); // query params
    // protocal://domain:port/path?querya=1&b=2
    searchStaysUrl.searchParams.append("guest_number", query.guest_number);
    searchStaysUrl.searchParams.append(
      "checkin_date",
      query.checkin_date.format("YYYY-MM-DD")
    );
    searchStaysUrl.searchParams.append(
      "checkout_date",
      query.checkout_date.format("YYYY-MM-DD")
    );
    searchStaysUrl.searchParams.append("lat", 37);
    searchStaysUrl.searchParams.append("lon", -122);
    searchStaysUrl.searchParams.append("distance", 500000);
  
  
    return fetch(searchStaysUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status >= 300) {
        throw Error("Fail to search stays");
      }
  
  
      return response.json();
    });  
}

export const deleteStay = (stayId) => {
    const authToken = localStorage.getItem("authToken");
    const deleteStayUrl = `${domain}/listings/${stayId}`;
  
  
    return fetch(deleteStayUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status >= 300) {
        throw Error("Fail to delete stay");
      }
    });
  };
  
  
  export const bookStay = (data) => {
    const authToken = localStorage.getItem("authToken");
    const bookStayUrl = `${domain}/bookings`;
  
  
    return fetch(bookStayUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status >= 300) {
        throw Error("Fail to book reservation");
      }
    });
  };
  
  
  export const cancelReservation = (reservationId) => {
    const authToken = localStorage.getItem("authToken");
    const cancelReservationUrl = `${domain}/bookings/${reservationId}`;
  
  
    return fetch(cancelReservationUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status >= 300) {
        throw Error("Fail to cancel reservation");
      }
    });
  };
  
  
  export const getReservationsByStay = (stayId) => {
    const authToken = localStorage.getItem("authToken");
    const getReservationByStayUrl = `${domain}/listings/${stayId}/bookings`;
  
  
    return fetch(getReservationByStayUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status >= 300) {
        throw Error("Fail to get reservations by stay");
      }
  
  
      return response.json();
    });
  };
  
  
  export const uploadStay = (data) => {
    const authToken = localStorage.getItem("authToken");
    const uploadStayUrl = `${domain}/listings`;
  
  
    return fetch(uploadStayUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: data,
    }).then((response) => {
      if (response.status >= 300) {
        throw Error("Fail to upload stay");
      }
    });
  };
  /**
 * LOGIN FUNCTION: PROMISE & PARAMETER FLOW
 * ========================================
 * 
 * 1. FUNCTION CALL
 *    login({ username: "user", password: "pass" })
 *    └─> credential parameter receives this object
 * 
 * 2. HTTP REQUEST
 *    fetch(url, { body: JSON.stringify(credential) })
 *    └─> Creates Promise, request runs in background
 *    └─> Returns immediately with Promise object
 * 
 * 3. CALLBACK REGISTRATION
 *    networkRequestStatus.then((response) => {...})
 *    └─> Registers function to run later when request completes
 *    └─> "response" parameter will be filled automatically by JavaScript
 * 
 * 4. ASYNC WAITING PERIOD
 *    [JavaScript continues running other code]
 *    [Network request happens in background]
 * 
 * 5. CALLBACK EXECUTION (when request completes)
 *    (response) => {...}  // Now runs with response object
 *    └─> Receives response = { status, headers, body, ... }
 *    └─> Process response and return response.json()
 * 
 * 6. RESULT HANDLING
 *    response.json() creates another Promise
 *    └─> Automatically passed to next .then() in chain
 *    └─> Available to caller: login().then(data => ...)
 */