import React, { useEffect } from "react";
import { Note } from "../types";

export interface NoteTitlesListProps {
  notes: Note[];
}

const NoteTitlesList: React.FC<NoteTitlesListProps> = ({ notes = [] }) => {
  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  );
};

export default NoteTitlesList;
