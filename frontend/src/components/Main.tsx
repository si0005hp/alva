import React from "react";
import auth0 from "../auth0/auth0-util";
import { Note } from "../types";
import NoteTitlesList from "./NoteTitlesList";

export interface MainProps {
  notes: Note[];
  isLoading?: boolean;
  history: any;
}

const Main: React.FC<MainProps> = ({
  notes = [],
  isLoading = false,
  history
}) => {
  const logout = () => {
    auth0.logout();
    history.push("/login");
  };

  return (
    <>
      <p>Main</p>

      {isLoading ? <p>Loading...</p> : <NoteTitlesList notes={notes} />}

      <button onClick={() => logout()}>Log out</button>
    </>
  );
};

export default Main;
