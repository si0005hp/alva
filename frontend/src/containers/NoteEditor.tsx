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
import { RootState } from "../reducers/index";

interface StateProps {
  note?: Note;
}

interface DispatchProps {
  submitNote: (submitType: SubmitType) => void;
  editNote: (note: Note) => void;
  deleteNote: (note: Note) => void;
}

type EnhancedNoteEditorProps = StateProps &
  DispatchProps &
  RouteComponentProps<{}>;

const mapStateToProps = (state: RootState): StateProps => ({
  note: state.note.notes[state.note.noteIdxOnEdit]
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      submitNote: (submitType: SubmitType) => submitNote.start({ submitType }),
      editNote: (note: Note) => editNote({ note }),
      deleteNote: (note: Note) =>
        note.id === NONE_ID
          ? deleteUnsavedNote()
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
  if (!note) {
    return <></>;
  }

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    editNote({ ...note, title: e.target.value });

  const onChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    editNote({ ...note, body: e.target.value });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitNote(note.id === NONE_ID ? SubmitType.CREATE : SubmitType.UPDATE);
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
    mapStateToProps,
    mapDispatchToProps
  )(NoteEditorContainer)
);
