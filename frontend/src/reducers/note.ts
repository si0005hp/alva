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
        default: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _: never = action;
          return state;
        }
      }
    };

export default noteReducer;

export const selectNoteById = (state: NoteState, noteId: number) =>
    state.notes.find(note => note.id === noteId);
