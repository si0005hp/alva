import React, { useState } from "react";
import NoteTitlesList from "./containers/NoteTitlesList";
import { RouteComponentProps } from "react-router";
import NoteEditor from "./containers/NoteEditor";
import NavHeader from "./components/NavHeader";
import auth0 from "./auth0/auth0-util";

const Main: React.FC<RouteComponentProps<{}>> = ({ history }) => {
  const [noteIdOnEdit, setNoteIdOnEdit] = useState(-1);

  const logout = () => {
    auth0.logout();
    history.push("/login");
  };

  return (
    <div className="Main">
      <NavHeader logout={logout} />
      <NoteTitlesList setNoteIdOnEdit={setNoteIdOnEdit} />
      <NoteEditor noteIdOnEdit={noteIdOnEdit} />
    </div>
  );
};

export default Main;
