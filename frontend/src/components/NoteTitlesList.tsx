import React from "react";
import { Note } from "../types";

export interface NoteTitlesListProps {
  notes: Note[];
  setNoteIdOnEdit: (id: number) => void;
}

const NoteTitlesList: React.FC<NoteTitlesListProps> = ({
  notes = [],
  setNoteIdOnEdit
}) => {
  return (
    <ul>
      {notes.map(note => (
        <li key={note.id} onClick={() => setNoteIdOnEdit(note.id)}>
          {note.title}
        </li>
      ))}
    </ul>
  );
};

export default NoteTitlesList;
