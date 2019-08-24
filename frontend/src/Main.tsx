import React, { useState } from "react";
import NoteTitlesList from "./containers/NoteTitlesList";
import { RouteComponentProps } from "react-router";
import NoteEditor from "./containers/NoteEditor";
import NavHeader from "./containers/NavHeader";

const Main: React.FC<RouteComponentProps<{}>> = () => {
  const [noteIdOnEdit, setNoteIdOnEdit] = useState(-1);

  return (
    <div className="Main">
      <NavHeader setNoteIdOnEdit={setNoteIdOnEdit} />
      <NoteTitlesList
        noteIdOnEdit={noteIdOnEdit}
        setNoteIdOnEdit={setNoteIdOnEdit}
      />
      <NoteEditor noteIdOnEdit={noteIdOnEdit} />
    </div>
  );
};

export default Main;
