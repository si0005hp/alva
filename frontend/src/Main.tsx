import React, { useState } from "react";
import NoteTitlesList from "./containers/NoteTitlesList";
import { RouteComponentProps, withRouter } from "react-router";
import NoteEditor from "./containers/NoteEditor";
import NavHeader from "./containers/NavHeader";
import { NONE_ID } from "./const";
import { connect } from "react-redux";
import { RootState } from "./reducers/index";
import { Note } from "./types/index";

interface StateProps {
  notes: Note[];
}

type MainProps = StateProps & RouteComponentProps<{}>;

const mapStateToProps = (state: RootState): StateProps => ({
  notes: state.note.notes
});

const Main: React.FC<MainProps> = ({ notes }) => {
  const [noteIdxOnEdit, setNoteIdxOnEdit] = useState(NONE_ID);

  return (
    <div className="Main">
      <NavHeader setNoteIdxOnEdit={setNoteIdxOnEdit} />
      <NoteTitlesList
        noteIdxOnEdit={noteIdxOnEdit}
        setNoteIdxOnEdit={setNoteIdxOnEdit}
      />
      {notes[noteIdxOnEdit] && (
        <NoteEditor noteIdxOnEdit={noteIdxOnEdit} note={notes[noteIdxOnEdit]} />
      )}
    </div>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Main)
);
