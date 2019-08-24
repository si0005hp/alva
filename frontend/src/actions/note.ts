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

/* UPDATE_NOTE */
interface UpdateNoteParams {
  note: Note;
}

interface UpdateNoteResult {
  note: Note;
}

export const updateNote = {
  start: (params: UpdateNoteParams) => ({
    type: ActionType.UPDATE_NOTE_START as typeof ActionType.UPDATE_NOTE_START,
    payload: params
  }),
  succeed: (params: UpdateNoteParams, result: UpdateNoteResult) => ({
    type: ActionType.UPDATE_NOTE_SUCCEED as
        typeof ActionType.UPDATE_NOTE_SUCCEED,
    payload: {params, result}
  }),
  fail: (params: UpdateNoteParams, error: AxiosError) => ({
    type: ActionType.UPDATE_NOTE_FAIL as typeof ActionType.UPDATE_NOTE_FAIL,
    payload: {params, error},
    error: true
  })
};

/* NEW_EMPTY_NOTE */
export const newEmptyNote = () => ({
  type: ActionType.NEW_EMPTY_NOTE as typeof ActionType.NEW_EMPTY_NOTE,
  payload: {}
})

export type NoteAction =|ReturnType<typeof getNotes.start>|
    ReturnType<typeof getNotes.succeed>|ReturnType<typeof getNotes.fail>|
    ReturnType<typeof updateNote.start>|ReturnType<typeof updateNote.succeed>|
    ReturnType<typeof updateNote.fail>|ReturnType<typeof newEmptyNote>;
