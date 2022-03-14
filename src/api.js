import { mockData } from "./mock-data";
import axios from 'axios';
import NProgress from "nprogress";

export const extractLocations = (events) => {
    //First is created a 'extractLocations' that creates a mapping to find the location of the events.
    var extractLocations = events.map((event) => event.location);
    //Second, this extractLocation(that contains the location) is added to an array named 'location' 
    var locations = [...new Set(extractLocations)];
    
    return locations;
}

const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

/*Under, the function will remove the code from the URL once you’re finished with it.
What this function does is check whether there’s a path, then build the URL with the 
current path (or build the URL without a path using window.history.pushState()).*/
const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
      var newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      window.history.pushState("", "", newurl);
    } else {
      newurl = window.location.protocol + "//" + window.location.host;
      window.history.pushState("", "", newurl);
    }
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    "https://r3t05ukc97.execute-api.eu-central-1.amazonaws.com/dev/api/token" +
      "/" +
      encodeCode
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);
  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};


export const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
    return mockData;
  }

  if (!navigator.onLine) {
    const data = localStorage.getItem("lastEvents");
    NProgress.done();
    return data?JSON.parse(data).events:[];;
  }
  
  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url =
      "https://r3t05ukc97.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" +
      "/" +
      token;
    const result = await axios.get(url);
    if (result.data) {
      //under are saved in the localStorage the last viewed events by the user. 
      //Like this, when the user opens the app offline, the localStorage 'saved' events will be displayed.
      var locations = extractLocations(result.data.events);
      localStorage.setItem("lastEvents", JSON.stringify(result.data));
      localStorage.setItem("locations", JSON.stringify(locations));
      NProgress.done();
      return result.data.events;
    }
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const results = await axios.get(
        "https://r3t05ukc97.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};
