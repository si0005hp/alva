import { Note } from "../types";
import React, { FC, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getNotes, changeNoteIdxOnEdit } from "../actions/note";
import { RootState } from "../reducers";
import NoteTitlesList, {
  NoteTitlesListProps
} from "../components/NoteTitlesList";
import { NONE_ID } from "../const";

interface StateProps {
  notes: Note[];
  isLoading?: boolean;
  noteIdxOnEdit: number;
}

interface DispatchProps {
  getNotesStart: () => void;
  changeNoteIdxOnEdit: (noteIdx: number) => void;
}

type EnhancedNoteTitlesListProps = NoteTitlesListProps &
  StateProps &
  DispatchProps &
  RouteComponentProps<{}>;

const mapStateToProps = (state: RootState): StateProps => ({
  notes: state.note.notes,
  isLoading: state.note.isLoading,
  noteIdxOnEdit: state.note.noteIdxOnEdit
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      getNotesStart: () => getNotes.start(),
      changeNoteIdxOnEdit: (noteIdx: number) => changeNoteIdxOnEdit({ noteIdx })
    },
    dispatch
  );

const NoteTitlesListContainer: FC<EnhancedNoteTitlesListProps> = ({
  notes,
  isLoading,
  getNotesStart,
  noteIdxOnEdit,
  changeNoteIdxOnEdit
}) => {
  useEffect(() => {
    getNotesStart();
  }, [getNotesStart]);

  useEffect(() => {
    if (!notes[noteIdxOnEdit]) {
      changeNoteIdxOnEdit(notes.length > 0 ? 0 : NONE_ID);
    }
  }, [changeNoteIdxOnEdit, noteIdxOnEdit, notes]);

  const fmtUpdateAtOfNotes = (notes: Note[]) =>
    notes.map(n => ({
      ...n,
      updated_at: n.updated_at
        ? new Date(n.updated_at).toLocaleString("ja-JP")
        : "Not saved yet."
    }));

  return (
    <NoteTitlesList
      notes={fmtUpdateAtOfNotes(notes)}
      isLoading={isLoading}
      noteIdxOnEdit={noteIdxOnEdit}
      changeNoteIdxOnEdit={changeNoteIdxOnEdit}
    />
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NoteTitlesListContainer)
);
