import { AxiosError } from "axios";
import { Note } from "../types";
import { ActionType } from "./types";

/* GET_NOTES */
interface GetNotesResult {
  notes: Note[];
}

export const getNotes = {
  start: () => ({
    type: ActionType.GET_NOTES_START,
    payload: {}
  }),
  succeed: (result: GetNotesResult) => ({
    type: ActionType.GET_NOTES_SUCCEED,
    payload: { result }
  }),
  fail: (error: AxiosError) => ({
    type: ActionType.GET_NOTES_FAIL,
    payload: { error },
    error: true
  })
};

/* SUBMIT_NOTE */
export enum SubmitType {
  CREATE,
  UPDATE
}

interface SubmitNoteParams {
  submitType: SubmitType;
}

interface SubmitNoteResult {
  note: Note;
}

export const submitNote = {
  start: (params: SubmitNoteParams) => ({
    type: ActionType.SUBMIT_NOTE_START,
    payload: params
  }),
  succeed: (params: SubmitNoteParams, result: SubmitNoteResult) => ({
    type: ActionType.SUBMIT_NOTE_SUCCEED,
    payload: { params, result }
  }),
  fail: (params: SubmitNoteParams, error: AxiosError) => ({
    type: ActionType.SUBMIT_NOTE_FAIL,
    payload: { params, error },
    error: true
  })
};

/* NEW_EMPTY_NOTE */
export const newEmptyNote = () => ({
  type: ActionType.NEW_EMPTY_NOTE,
  payload: {}
});

/* EDIT_NOTE */
interface EditNoteParams {
  note: Note;
}

export const editNote = (params: EditNoteParams) => ({
  type: ActionType.EDIT_NOTE as typeof ActionType.EDIT_NOTE,
  payload: { params }
});

/* DELETE_NOTE */
interface DeleteNoteParams {
  noteId: number;
}

interface DeleteNoteResult {
  note: Note;
}

export const deleteNote = {
  start: (params: DeleteNoteParams) => ({
    type: ActionType.DELETE_NOTE_START,
    payload: params
  }),
  succeed: (params: DeleteNoteParams, result: DeleteNoteResult) => ({
    type: ActionType.DELETE_NOTE_SUCCEED,
    payload: { params, result }
  }),
  fail: (params: DeleteNoteParams, error: AxiosError) => ({
    type: ActionType.DELETE_NOTE_FAIL,
    payload: { params, error },
    error: true
  })
};

/* DELETE_UNSAVED_NOTE */
export const deleteUnsavedNote = () => ({
  type: ActionType.DELETE_UNSAVED_NOTE,
  payload: {}
});

/* DELETE_UNSAVED_NOTE */
interface ChangeNoteIdxOnEditParams {
  noteIdx: number;
}

/* CHANGE_NOTE_IDX_ON_EDIT */
export const changeNoteIdxOnEdit = (params: ChangeNoteIdxOnEditParams) => ({
  type: ActionType.CHANGE_NOTE_IDX_ON_EDIT,
  payload: { params }
});

export type NoteAction =
  | ReturnType<typeof getNotes.start>
  | ReturnType<typeof getNotes.succeed>
  | ReturnType<typeof getNotes.fail>
  | ReturnType<typeof submitNote.start>
  | ReturnType<typeof submitNote.succeed>
  | ReturnType<typeof submitNote.fail>
  | ReturnType<typeof newEmptyNote>
  | ReturnType<typeof editNote>
  | ReturnType<typeof deleteNote.start>
  | ReturnType<typeof deleteNote.succeed>
  | ReturnType<typeof deleteNote.fail>
  | ReturnType<typeof deleteUnsavedNote>
  | ReturnType<typeof changeNoteIdxOnEdit>;
