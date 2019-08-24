import {AxiosError} from 'axios';
import {Note} from '../types';
import * as ActionType from './types';

/* GET_NOTES */
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
    payload: {result}
  }),
  fail: (error: AxiosError) => ({
    type: ActionType.GET_NOTES_FAIL as typeof ActionType.GET_NOTES_FAIL,
    payload: {error},
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
  note: Note;
}

interface SubmitNoteResult {
  note: Note;
}

export const submitNote = {
  start: (params: SubmitNoteParams) => ({
    type: ActionType.SUBMIT_NOTE_START as typeof ActionType.SUBMIT_NOTE_START,
    payload: params
  }),
  succeed: (params: SubmitNoteParams, result: SubmitNoteResult) => ({
    type: ActionType.SUBMIT_NOTE_SUCCEED as
        typeof ActionType.SUBMIT_NOTE_SUCCEED,
    payload: {params, result}
  }),
  fail: (params: SubmitNoteParams, error: AxiosError) => ({
    type: ActionType.SUBMIT_NOTE_FAIL as typeof ActionType.SUBMIT_NOTE_FAIL,
    payload: {params, error},
    error: true
  })
};

/* NEW_EMPTY_NOTE */
export const newEmptyNote = () => ({
  type: ActionType.NEW_EMPTY_NOTE as typeof ActionType.NEW_EMPTY_NOTE,
  payload: {}
});

/* EDIT_NOTE */
interface EditNoteParams {
  noteIdxOnEdit: number;
  note: Note;
}

export const editNote = (params: EditNoteParams) => ({
  type: ActionType.EDIT_NOTE as typeof ActionType.EDIT_NOTE,
  payload: {params}
});

export type NoteAction =
    |ReturnType<typeof getNotes.start>|ReturnType<typeof getNotes.succeed>|
    ReturnType<typeof getNotes.fail>|ReturnType<typeof submitNote.start>|
    ReturnType<typeof submitNote.succeed>|ReturnType<typeof submitNote.fail>|
    ReturnType<typeof newEmptyNote>|ReturnType<typeof editNote>;
