import React, { FC } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import NoteEditor from "../components/NoteEditor";
import { Note } from "../types/index";
import { bindActionCreators, Dispatch } from "redux";
import { submitNote, editNote, SubmitType, deleteNote } from "../actions/note";
import { NONE_ID } from "../const";

interface StateProps {
  note?: Note;
}

interface DispatchProps {
  submitNoteStart: (submitType: SubmitType, note: Note) => void;
  editNote: (note: Note) => void;
  deleteNoteStart: (noteId: number) => void;
}

interface OwnProps {
  noteIdxOnEdit: number;
}

type EnhancedNoteEditorProps = StateProps &
  DispatchProps &
  OwnProps &
  RouteComponentProps<{}>;

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  note: state.note.notes[ownProps.noteIdxOnEdit]
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps =>
  bindActionCreators(
    {
      submitNoteStart: (submitType: SubmitType, note: Note) =>
        submitNote.start({ submitType, note }),
      editNote: (note: Note) =>
        editNote({ noteIdxOnEdit: ownProps.noteIdxOnEdit, note }),
      deleteNoteStart: (noteId: number) => deleteNote.start({ noteId })
    },
    dispatch
  );

const NoteEditorContainerWrapper: FC<EnhancedNoteEditorProps> = ({
  note,
  submitNoteStart,
  editNote,
  deleteNoteStart
}) =>
  note ? (
    <NoteEditorContainer
      note={note}
      submitNoteStart={submitNoteStart}
      editNote={editNote}
      deleteNoteStart={deleteNoteStart}
    />
  ) : (
    <></>
  );

interface HasNote {
  note: Note;
}

type NoteEditorContainerProps = HasNote & DispatchProps;

const NoteEditorContainer: FC<NoteEditorContainerProps> = ({
  note,
  submitNoteStart,
  editNote,
  deleteNoteStart
}) => {
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    editNote({ ...note, title: e.target.value });

  const onChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    editNote({ ...note, body: e.target.value });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitNoteStart(
      note.id === NONE_ID ? SubmitType.CREATE : SubmitType.UPDATE,
      note
    );
  };

  const onClickDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    deleteNoteStart(note.id);
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
  )(NoteEditorContainerWrapper)
);
