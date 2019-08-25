import React, { FC } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import NoteEditor from "../components/NoteEditor";
import { Note } from "../types/index";
import { bindActionCreators, Dispatch } from "redux";
import {
  submitNote,
  editNote,
  SubmitType,
  deleteNote,
  deleteUnsavedNote
} from "../actions/note";
import { NONE_ID } from "../const";

interface DispatchProps {
  submitNote: (submitType: SubmitType, note: Note) => void;
  editNote: (note: Note) => void;
  deleteNote: (note: Note) => void;
}

interface OwnProps {
  noteIdxOnEdit: number;
  note: Note;
}

type EnhancedNoteEditorProps = DispatchProps &
  OwnProps &
  RouteComponentProps<{}>;

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps =>
  bindActionCreators(
    {
      submitNote: (submitType: SubmitType, note: Note) =>
        submitNote.start({
          submitType,
          noteIdxOnEdit: ownProps.noteIdxOnEdit,
          note
        }),
      editNote: (note: Note) =>
        editNote({ noteIdxOnEdit: ownProps.noteIdxOnEdit, note }),
      deleteNote: (note: Note) =>
        note.id === NONE_ID
          ? deleteUnsavedNote({ noteIdxOnEdit: ownProps.noteIdxOnEdit })
          : deleteNote.start({ noteId: note.id })
    },
    dispatch
  );

const NoteEditorContainer: FC<EnhancedNoteEditorProps> = ({
  note,
  submitNote,
  editNote,
  deleteNote
}) => {
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    editNote({ ...note, title: e.target.value });

  const onChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    editNote({ ...note, body: e.target.value });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitNote(
      note.id === NONE_ID ? SubmitType.CREATE : SubmitType.UPDATE,
      note
    );
  };

  const onClickDelete = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    deleteNote(note);
  };

  return (
    <NoteEditor
      title={note.title}
      body={note.body}
      onChangeTitle={onChangeTitle}
      onChangeBody={onChangeBody}
      onSubmit={onSubmit}
      onClickDelete={onClickDelete}
    />
  );
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(NoteEditorContainer)
);
