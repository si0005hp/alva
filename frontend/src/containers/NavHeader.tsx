import React, { FC } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import NavHeader from "../components/NavHeader";
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
  newEmptyNote,
  changeNoteIdxOnEdit
}) => {
  const newNote = () => {
    newEmptyNote();
    changeNoteIdxOnEdit(0);
  };

  return <NavHeader onClickNew={newNote} />;
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(NavHeaderContainer)
);
