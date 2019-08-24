import React, { FC } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import NavHeader from "../components/NavHeader";
import auth0 from "../auth0/auth0-util";
import { newEmptyNote } from "../actions/note";

interface DispatchProps {
  newEmptyNote: () => void;
}

interface OwnProps {
  setNoteIdOnEdit: (id: number) => void;
}

type EnhancedNavHeaderProps = DispatchProps &
  OwnProps &
  RouteComponentProps<{}>;

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      newEmptyNote: () => newEmptyNote()
    },
    dispatch
  );

const NavHeaderContainer: FC<EnhancedNavHeaderProps> = ({
  history,
  newEmptyNote,
  setNoteIdOnEdit
}) => {
  const logout = () => {
    auth0.logout();
    history.push("/login");
  };

  const newNote = () => {
    newEmptyNote();
    // setNoteIdOnEdit(0); TODO
  };

  return <NavHeader onClickLogout={logout} onClickNew={newNote} />;
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(NavHeaderContainer)
);
