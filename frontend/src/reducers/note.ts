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

        /* UPDATE_NOTE */
        case ActionType.UPDATE_NOTE_START:
          return state;
        case ActionType.UPDATE_NOTE_SUCCEED:
          return {
            ...state,
            notes: applyPatchToNotes(action.payload.result.note, state.notes)
          };
        case ActionType.UPDATE_NOTE_FAIL:
          return state;

        /* NEW_EMPTY_NOTE */
        case ActionType.NEW_EMPTY_NOTE:
          return {
            ...state, notes: [createEmptyNote(), ...state.notes]
          }
        default: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _: never = action;
          return state;
        }
      }
    };

export default noteReducer;

const applyPatchToNotes = (updatedNote: Note, notes: Note[]) =>
    notes.map(note => (note.id === updatedNote.id ? updatedNote : note));

const createEmptyNote = (): Note => ({id: -1, title: '', body: ''})