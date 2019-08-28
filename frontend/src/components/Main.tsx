import React from "react";
import NoteTitlesList from "../containers/NoteTitlesList";
import { RouteComponentProps } from "react-router";
import NoteEditor from "../containers/NoteEditor";
import NavHeader from "../containers/NavHeader";

const Main: React.FC<RouteComponentProps<{}>> = () => {
  return (
    <div className="Main">
      <NavHeader />
      <NoteTitlesList />
      <NoteEditor />
    </div>
  );
};

export default Main;
