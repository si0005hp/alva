import React, { useEffect } from "react";
import lock from "../auth0/lock";

const Login: React.FC = () => {
  useEffect(() => {
    lock("show-auth").show();
  });

  return <div id="show-auth" />;
};

export default Login;
