import React, { useState, useEffect } from "react";
import auth0 from "../auth0/auth0-util";
import { Note } from "../types";
import NoteTitlesList from "./NoteTitlesList";
import NoteEditor from "./NoteEditor";

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
  const [noteIdOnEdit, setNoteIdOnEdit] = useState(-1);

  useEffect(() => {
    setNoteIdOnEdit(notes[0] ? notes[0].id : -1);
  }, [notes]);

  const findNoteById = (id: number) => notes.find(n => n.id === id);

  const logout = () => {
    auth0.logout();
    history.push("/login");
  };

  return (
    <>
      <p>Main</p>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <NoteTitlesList notes={notes} setNoteIdOnEdit={setNoteIdOnEdit} />
      )}

      <NoteEditor note={findNoteById(noteIdOnEdit)} />

      <button onClick={() => logout()}>Log out</button>
    </>
  );
};

export default Main;
