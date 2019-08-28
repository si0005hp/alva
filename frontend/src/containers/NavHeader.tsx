import React, { FC } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import NavHeader from "../components/NavHeader";
import auth0 from "../auth0/auth0-util";
import { newEmptyNote, changeNoteIdxOnEdit } from "../actions/note";

interface DispatchProps {
  newEmptyNote: () => void;
  changeNoteIdxOnEdit: (noteIdx: number) => void;
}

type EnhancedNavHeaderProps = DispatchProps & RouteComponentProps<{}>;

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      newEmptyNote: () => newEmptyNote(),
      changeNoteIdxOnEdit: (noteIdx: number) => changeNoteIdxOnEdit({ noteIdx })
    },
    dispatch
  );

const NavHeaderContainer: FC<EnhancedNavHeaderProps> = ({
  history,
  newEmptyNote,
  changeNoteIdxOnEdit
}) => {
  const logout = () => {
    auth0.logout();
    history.push("/login");
  };

  const newNote = () => {
    newEmptyNote();
    changeNoteIdxOnEdit(0);
  };

  return <NavHeader onClickLogout={logout} onClickNew={newNote} />;
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(NavHeaderContainer)
);
