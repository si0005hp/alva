import React from "react";
import { Note } from "../types";

export interface NoteEditorProps {
  note?: Note;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note }) => {
  return (
    <>
      {note && (
        <>
          <h2>Title: {note.title}</h2>
          <p>{note.body}</p>
        </>
      )}
    </>
  );
};

export default NoteEditor;
