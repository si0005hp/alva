import React from "react";

export interface NoteEditorProps {
  title: string;
  body: string;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBody: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClickDelete: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  title,
  body,
  onChangeTitle,
  onChangeBody,
  onSubmit,
  onClickDelete
}) => {
  return (
    <div className="NoteEditor">
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            value={title}
            onChange={onChangeTitle}
            required
            pattern=".*\S+.*"
          />
        </div>
        <div>
          <textarea value={body} onChange={onChangeBody} />
        </div>
        <button type="submit">SAVE</button>
      </form>
      <button onClick={onClickDelete}>DELETE</button>
    </div>
  );
};

export default NoteEditor;
