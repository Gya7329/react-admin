
import { Auth0Client } from "@auth0/auth0-spa-js";

export const auth0 = new Auth0Client({
  domain: "dev-vrc2vd3v.us.auth0.com",
  client_id: "LVv5zo1ZTOirWGxYf5f9JS4zlOYPZphU",
  redirect_uri: "http://localhost:3000/login",
  cacheLocation: "localstorage",
  useRefreshTokens: true,
});

export default {
  // called when the user attempts to log in
  login: (url) => {
    if (typeof url === "undefined") {
      return auth0.loginWithRedirect();
    }
    return auth0.handleRedirectCallback(url.location);
  },
  // called when the user clicks on the logout button
  logout: () => {
    return auth0.isAuthenticated().then(function (isAuthenticated) {
      if (isAuthenticated) {
        // need to check for this as react-admin calls logout in case checkAuth failed
        return auth0.logout({
          redirect_uri: window.location.origin,
          federated: true, // have to be enabled to invalidate refresh token
        });
      }
      return Promise.resolve();
    });
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    console.log("checking auth");
    return auth0.isAuthenticated().then(function (isAuthenticated) {
      console.log(isAuthenticated);
      if (isAuthenticated) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    });
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => {
    return Promise.resolve();
  },
};