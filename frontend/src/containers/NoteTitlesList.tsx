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

type EnhancedNoteTitlesListProps = NoteTitlesListProps &
  StateProps &
  DispatchProps &
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
  setNoteIdOnEdit
}) => {
  useEffect(() => {
    getNotesStart();
  }, [getNotesStart]);

  useEffect(() => {
    setNoteIdOnEdit(notes[0] ? notes[0].id : -1);
  }, [setNoteIdOnEdit, notes]);

  return (
    <NoteTitlesList
      notes={notes}
      isLoading={isLoading}
      setNoteIdOnEdit={setNoteIdOnEdit}
    />
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NoteTitlesListContainer)
);
