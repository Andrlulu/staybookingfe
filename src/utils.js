const domain = "http://localhost:8080"; // local for now, will change to production later

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
  