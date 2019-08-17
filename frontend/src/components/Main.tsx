import React from "react";
import auth0 from "../auth0/auth0-util";
import { Redirect } from "react-router";

interface Props {
  history: any;
}

const Main: React.FC<Props> = ({ history }) => {
  const logout = () => {
    auth0.logout();
    history.push("/login");
  };

  return (
    <>
      <p>Main</p>

      {auth0.isAuthenticated() && (
        <button onClick={() => logout()}>Log out</button>
      )}
    </>
  );
};

const MainWrapper: React.FC<Props> = (props: Props) =>
  auth0.isAuthenticated() ? <Main {...props} /> : <Redirect to="/login" />;

export default MainWrapper;
