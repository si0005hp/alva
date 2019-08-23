import React, { useState } from "react";
import NoteTitlesList from "./containers/NoteTitlesList";
import { RouteComponentProps } from "react-router";
import NoteEditor from "./containers/NoteEditor";

const Main: React.FC<RouteComponentProps<{}>> = () => {
  const [noteIdOnEdit, setNoteIdOnEdit] = useState(-1);
  return (
    <div className="Main">
      <NoteTitlesList setNoteIdOnEdit={setNoteIdOnEdit} />
      <NoteEditor noteIdOnEdit={noteIdOnEdit} />
    </div>
  );
};

export default Main;
