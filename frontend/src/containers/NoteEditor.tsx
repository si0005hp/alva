import React, { FC } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import NoteEditor, { NoteEditorProps } from "../components/NoteEditor";
import { selectNoteById } from "../reducers/note";
import { Note } from "../types/index";

interface StateProps {
  note?: Note;
}

interface OwnProps {
  noteIdOnEdit: number;
}

type EnhancedNoteEditorProps = NoteEditorProps &
  StateProps &
  RouteComponentProps<{}>;

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  note: selectNoteById(state.note, ownProps.noteIdOnEdit)
});

const NoteEditorContainer: FC<EnhancedNoteEditorProps> = ({ note }) => {
  return <NoteEditor note={note} />;
};

export default withRouter(connect(mapStateToProps)(NoteEditorContainer));
