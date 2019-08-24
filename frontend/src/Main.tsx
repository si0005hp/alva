import React, { useState } from "react";
import NoteTitlesList from "./containers/NoteTitlesList";
import { RouteComponentProps } from "react-router";
import NoteEditor from "./containers/NoteEditor";
import NavHeader from "./containers/NavHeader";

const Main: React.FC<RouteComponentProps<{}>> = () => {
  const [noteIdxOnEdit, setNoteIdxOnEdit] = useState(-1);

  return (
    <div className="Main">
      <NavHeader setNoteIdxOnEdit={setNoteIdxOnEdit} />
      <NoteTitlesList
        noteIdxOnEdit={noteIdxOnEdit}
        setNoteIdxOnEdit={setNoteIdxOnEdit}
      />
      <NoteEditor noteIdxOnEdit={noteIdxOnEdit} />
    </div>
  );
};

export default Main;
