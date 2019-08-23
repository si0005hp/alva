import React from "react";
import { Note } from "../types";

export interface NoteTitlesListProps {
  notes: Note[];
  isLoading?: boolean;
  setNoteIdOnEdit: (id: number) => void;
}

const NoteTitlesList: React.FC<NoteTitlesListProps> = ({
  notes = [],
  isLoading = false,
  setNoteIdOnEdit
}) => {
  return (
    <div className="NoteTitlesList">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {notes.map(note => (
            <li key={note.id} onClick={() => setNoteIdOnEdit(note.id)}>
              {note.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteTitlesList;
