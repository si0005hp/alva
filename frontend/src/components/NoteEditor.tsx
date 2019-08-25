/** @jsx jsx */
import React, { FormEvent } from "react";
import { jsx, css } from "@emotion/core";
import {
  Button,
  Input,
  TextArea,
  TextAreaProps,
  Form
} from "semantic-ui-react";

const divNoteEditor = css`
  padding: 32px;
`;
const form = css`
  width: 1080px;
`;
const formRow = css`
  margin-bottom: 32px;
`;
const formRowItemBase = css`
  width: 100%;
`;
const titleInput = css`
  ${formRowItemBase};
`;
const bodyTextArea = css`
  ${formRowItemBase};
  height: 480px;
`;

export interface NoteEditorProps {
  title: string;
  body: string;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBody: (
    e: FormEvent<HTMLTextAreaElement>,
    data: TextAreaProps
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClickDelete: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  title,
  body,
  onChangeTitle,
  onChangeBody,
  onSubmit,
  onClickDelete
}) => {
  return (
    <div className="NoteEditor" css={divNoteEditor}>
      <Form onSubmit={onSubmit} css={form}>
        <div css={formRow}>
          <Input
            css={titleInput}
            type="text"
            value={title}
            onChange={onChangeTitle}
            required
            pattern=".*\S+.*"
            placeholder="title"
          />
        </div>
        <div css={formRow}>
          <TextArea
            css={bodyTextArea}
            value={body}
            onChange={onChangeBody}
            placeholder="body"
          />
        </div>
        <div css={formRow}>
          <Button primary type="submit">
            SAVE
          </Button>
          <Button negative onClick={onClickDelete}>
            DELETE
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NoteEditor;
