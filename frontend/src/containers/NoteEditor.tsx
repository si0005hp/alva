import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import NoteEditor from "../components/NoteEditor";
import { selectNoteById } from "../reducers/note";
import { Note } from "../types/index";
import { bindActionCreators, Dispatch } from "redux";
import { updateNote } from "../actions/note";

interface StateProps {
  note?: Note;
}

interface DispatchProps {
  updateNoteStart: (note: Note) => void;
}

interface OwnProps {
  noteIdOnEdit: number;
}

type EnhancedNoteEditorProps = StateProps &
  DispatchProps &
  OwnProps &
  RouteComponentProps<{}>;

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  note: selectNoteById(state.note, ownProps.noteIdOnEdit)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      updateNoteStart: (note: Note) => updateNote.start({ note })
    },
    dispatch
  );

const NoteEditorContainerWrapper: FC<EnhancedNoteEditorProps> = ({
  note,
  updateNoteStart
}) =>
  note ? (
    <NoteEditorContainer note={note} updateNoteStart={updateNoteStart} />
  ) : (
    <></>
  );

interface NoteEditorContainerProps {
  note: Note;
  updateNoteStart: (note: Note) => void;
}

const NoteEditorContainer: FC<NoteEditorContainerProps> = ({
  note,
  updateNoteStart
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
    updateNoteStart({ id: note.id, title, body });
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
