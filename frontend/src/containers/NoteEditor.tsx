import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import NoteEditor from "../components/NoteEditor";
import { Note } from "../types/index";
import { bindActionCreators, Dispatch } from "redux";
import { submitNote } from "../actions/note";

interface StateProps {
  note?: Note;
}

interface DispatchProps {
  submitNoteStart: (note: Note) => void;
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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      submitNoteStart: (note: Note) => submitNote.start({ note })
    },
    dispatch
  );

const NoteEditorContainerWrapper: FC<EnhancedNoteEditorProps> = ({
  note,
  submitNoteStart
}) =>
  note ? (
    <NoteEditorContainer note={note} submitNoteStart={submitNoteStart} />
  ) : (
    <></>
  );

interface NoteEditorContainerProps {
  note: Note;
  submitNoteStart: (note: Note) => void;
}

const NoteEditorContainer: FC<NoteEditorContainerProps> = ({
  note,
  submitNoteStart
}) => {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  useEffect(() => {
    setTitle(note.title);
    setBody(note.body);
  }, [note]);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value.trim());
  const onChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setBody(e.target.value.trim());
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitNoteStart({ id: note.id, title, body });
  };

  return (
    <NoteEditor
      title={title}
      body={body}
      onChangeTitle={onChangeTitle}
      onChangeBody={onChangeBody}
      onSubmit={onSubmit}
    />
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NoteEditorContainerWrapper)
);
