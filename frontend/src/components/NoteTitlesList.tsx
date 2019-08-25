/** @jsx jsx */
import React from "react";
import { Note } from "../types";
import { jsx, css } from "@emotion/core";
import { List, Segment, Dimmer, Loader, Image } from "semantic-ui-react";
import { headerHeight } from "./NavHeader";

const list = css`
  border-right: 0.5px solid lightgrey;
  height: calc(100vh - ${headerHeight});
  overflow: scroll;
`;

const listItem = css`
  height: 90px;
  width: 300px;
  cursor: pointer;
  &:hover {
    background-color: #f0f8ff;
  }
`;

const listItemContentBase = css`
  display: inline-block;
  margin: 12px;
`;

const listItemTitle = css`
  font-size: 1.25em;
  ${listItemContentBase};
`;

const listItemDate = css`
  font-size: 1em;
  ${listItemContentBase};
`;

const selectedListItem = css`
  ${listItem};
  background-color: #eeeeee;
`;

export interface NoteTitlesListProps {
  notes: Note[];
  isLoading?: boolean;
  noteIdxOnEdit: number;
  changeNoteIdxOnEdit: (id: number) => void;
}

const NoteTitlesList: React.FC<NoteTitlesListProps> = ({
  notes = [],
  isLoading = false,
  noteIdxOnEdit,
  changeNoteIdxOnEdit
}) => {
  return (
    <div className="NoteTitlesList">
      {isLoading ? (
        <Spinner msg="Loading..." />
      ) : (
        <List css={list} celled relaxed>
          {notes.map((note, idx) => (
            <List.Item
              css={idx === noteIdxOnEdit ? selectedListItem : listItem}
              key={idx}
              onClick={() => changeNoteIdxOnEdit(idx)}
            >
              <span css={listItemTitle}>{note.title}</span>
              <br />
              <span css={listItemDate}>updated: {note.updated_at}</span>
            </List.Item>
          ))}
        </List>
      )}
    </div>
  );
};

const Spinner: React.FC<{ msg: string }> = ({ msg }) => (
  <Segment>
    <Dimmer active inverted>
      <Loader inverted>{msg}</Loader>
    </Dimmer>

    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
  </Segment>
);

export default NoteTitlesList;
