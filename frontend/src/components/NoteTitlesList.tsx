import React from "react";
import { Note } from "../types";

export interface NoteTitlesListProps {
  notes: Note[];
  isLoading?: boolean;
  changeNoteIdxOnEdit: (id: number) => void;
}

const NoteTitlesList: React.FC<NoteTitlesListProps> = ({
  notes = [],
  isLoading = false,
  changeNoteIdxOnEdit
}) => {
  return (
    <div className="NoteTitlesList">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {notes.map((note, idx) => (
            <li key={idx} onClick={() => changeNoteIdxOnEdit(idx)}>
              {note.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteTitlesList;
