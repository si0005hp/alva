import {AxiosError} from 'axios';
import {Reducer} from 'redux';

import {NoteAction} from '../actions/note';
import * as ActionType from '../actions/types';
import {Note} from '../types';

export interface NoteState {
  notes: Note[];
  isLoading: boolean;
  error?: AxiosError|null;
}

export const initialState: NoteState = {
  notes: [],
  isLoading: false
};

const noteReducer: Reducer<NoteState, NoteAction> =
    (state: NoteState = initialState, action: NoteAction): NoteState => {
      switch (action.type) {
        /* GET_NOTES */
        case ActionType.GET_NOTES_START:
          return {...state, notes: [], isLoading: true};
        case ActionType.GET_NOTES_SUCCEED:
          return {
            ...state,
            notes: action.payload.result.notes,
            isLoading: false
          };
        case ActionType.GET_NOTES_FAIL:
          return {...state, isLoading: false, error: action.payload.error};

        /* SUBMIT_NOTE */
        case ActionType.SUBMIT_NOTE_START:
          return state;
        case ActionType.SUBMIT_NOTE_SUCCEED:
          return {
            ...state,
            notes:
                applyPatchToNotesById(action.payload.result.note, state.notes)
          };
        case ActionType.SUBMIT_NOTE_FAIL:
          return state;

        /* NEW_EMPTY_NOTE */
        case ActionType.NEW_EMPTY_NOTE:
          return {
            ...state, notes: [createEmptyNote(), ...state.notes]
          }

        /* EDIT_NOTE */
        case ActionType.EDIT_NOTE:
          const {noteIdxOnEdit, note} = action.payload.params;
          return {
            ...state,
                notes: applyPatchToNoteByIdx(note, noteIdxOnEdit, state.notes)
          }
        default: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _: never = action;
          return state;
        }
      }
    };

export default noteReducer;

const applyPatchToNotesById = (updatedNote: Note, notes: Note[]) =>
    notes.map(note => (note.id === updatedNote.id ? updatedNote : note));

const applyPatchToNoteByIdx =
    (updatedNote: Note, updatedNoteIdx: number, notes: Note[]) =>
        notes.map((note, idx) => (idx === updatedNoteIdx ? updatedNote : note));

const createEmptyNote = (): Note => ({id: -1, title: '', body: ''})