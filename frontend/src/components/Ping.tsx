import React from "react";
import axios from "axios";

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
  return (
    <div className="Ping">
      <button onClick={() => pingGet()}>GET</button>
      <button onClick={() => pingPost()}>POST</button>
    </div>
  );
};

export default Ping;
