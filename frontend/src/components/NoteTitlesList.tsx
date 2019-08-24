import React from "react";
import { Note } from "../types";

export interface NoteTitlesListProps {
  notes: Note[];
  isLoading?: boolean;
  setNoteIdxOnEdit: (id: number) => void;
}

const NoteTitlesList: React.FC<NoteTitlesListProps> = ({
  notes = [],
  isLoading = false,
  setNoteIdxOnEdit
}) => {
  return (
    <div className="NoteTitlesList">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {notes.map((note, idx) => (
            <li key={idx} onClick={() => setNoteIdxOnEdit(idx)}>
              {note.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteTitlesList;
