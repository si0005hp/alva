import React from "react";
import axios from "axios";
import auth0 from "../auth0/auth0-util";

// TODO delete me
const Ping: React.FC = () => {
  const pingGet = () => {
    axios
      .get("/api/v1/ping")
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };
  const pingPost = () => {
    axios
      .post("/api/v1/ping")
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };
  const pingAuth = () => {
    axios
      .get("/api/v1/ping/1", {
        headers: { Authorization: "Bearer " + auth0.getIdToken() }
      })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };
  return (
    <div className="Ping">
      <button onClick={() => pingGet()}>GET</button>
      <button onClick={() => pingPost()}>POST</button>
      <button onClick={() => pingAuth()}>AUTH</button>
    </div>
  );
};

export default Ping;
