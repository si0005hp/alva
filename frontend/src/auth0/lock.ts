import Auth0Lock from "auth0-lock";

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`;

const lock = (container: string) =>
  new Auth0Lock(
    process.env.REACT_APP_AUTH0_CLIENTID || "",
    process.env.REACT_APP_AUTH0_DOMAIN || "",
    {
      container: "show-auth",
      closable: false,
      auth: {
        responseType: "token id_token",
        redirectUrl: getBaseUrl() + "/callback",
        params: {
          scope: "openid profile email"
        }
      }
    }
  );

export default lock;
