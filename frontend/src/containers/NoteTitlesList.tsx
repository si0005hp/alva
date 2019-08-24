import { Note } from "../types";
import React, { FC, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getNotes } from "../actions/note";
import { RootState } from "../reducers";
import NoteTitlesList, {
  NoteTitlesListProps
} from "../components/NoteTitlesList";

interface StateProps {
  notes: Note[];
  isLoading?: boolean;
}

interface DispatchProps {
  getNotesStart: () => void;
}

interface OwnProps {
  noteIdxOnEdit: number;
}

type EnhancedNoteTitlesListProps = NoteTitlesListProps &
  StateProps &
  DispatchProps &
  OwnProps &
  RouteComponentProps<{}>;

const mapStateToProps = (state: RootState): StateProps => ({
  notes: state.note.notes,
  isLoading: state.note.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      getNotesStart: () => getNotes.start()
    },
    dispatch
  );

const NoteTitlesListContainer: FC<EnhancedNoteTitlesListProps> = ({
  notes,
  isLoading,
  getNotesStart,
  noteIdxOnEdit,
  setNoteIdxOnEdit
}) => {
  useEffect(() => {
    getNotesStart();
  }, [getNotesStart]);

  useEffect(() => {
    if (noteIdxOnEdit === -1 && notes[0]) {
      setNoteIdxOnEdit(notes[0].id);
    }
  }, [setNoteIdxOnEdit, noteIdxOnEdit, notes]);

  return (
    <NoteTitlesList
      notes={notes}
      isLoading={isLoading}
      setNoteIdxOnEdit={setNoteIdxOnEdit}
    />
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NoteTitlesListContainer)
);
