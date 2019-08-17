import Main, { MainProps } from "../components/Main";
import { Note } from "../types";
import React, { FC, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getNotes } from "../actions/note";
import { RootState } from "../reducers";

interface StateProps {
  notes: Note[];
  isLoading?: boolean;
}

interface DispatchProps {
  getNotesStart: () => void;
}

type EnhancedMainProps = MainProps &
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

const MainContainer: FC<EnhancedMainProps> = ({
  notes,
  isLoading,
  getNotesStart,
  history
}) => {
  useEffect(() => {
    getNotesStart();
  }, []);

  return <Main notes={notes} isLoading={isLoading} history={history} />;
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainContainer)
);
