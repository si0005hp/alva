/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import NoteTitlesList from "../containers/NoteTitlesList";
import { RouteComponentProps } from "react-router";
import NoteEditor from "../containers/NoteEditor";
import NavHeader from "../containers/NavHeader";

const divNoteAppContainer = css`
  display: flex;
`;

const Main: React.FC<RouteComponentProps<{}>> = () => {
  return (
    <div className="Main">
      <NavHeader />
      <div className="NoteAppContainer" css={divNoteAppContainer}>
        <NoteTitlesList />
        <NoteEditor />
      </div>
    </div>
  );
};

export default Main;
