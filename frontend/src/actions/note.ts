import * as ActionType from "./types";
import { Note } from "../types";

interface GetNotesResult {
  notes: Note[];
}

export const getNotes = {
  start: () => ({
    type: ActionType.GET_NOTES_START as typeof ActionType.GET_NOTES_START,
    payload: {}
  }),
  succeed: (result: GetNotesResult) => ({
    type: ActionType.GET_NOTES_SUCCEED as typeof ActionType.GET_NOTES_SUCCEED,
    payload: { result }
  }),
  fail: (error: any) => ({
    type: ActionType.GET_NOTES_FAIL as typeof ActionType.GET_NOTES_FAIL,
    payload: { error },
    error: true
  })
};

export type NoteAction =
  | ReturnType<typeof getNotes.start>
  | ReturnType<typeof getNotes.succeed>
  | ReturnType<typeof getNotes.fail>;
