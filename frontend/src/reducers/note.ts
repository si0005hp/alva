import {AxiosError} from 'axios';
import {Reducer} from 'redux';

import {NoteAction} from '../actions/note';
import * as ActionType from '../actions/types';
import {Note} from '../types';

import {SubmitType} from './../actions/note';
import {NONE_ID} from './../const';

export interface NoteState {
  notes: Note[];
  isLoading: boolean;
  noteIdxOnEdit: number;
  error?: AxiosError|null;
}

export const initialState: NoteState = {
  notes: [],
  isLoading: false,
  noteIdxOnEdit: -1
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
          const {params, result} = action.payload;
          return {
            ...state,
            notes: params.submitType === SubmitType.CREATE ?
                applyPatchToNotesByIdx(
                    result.note, state.noteIdxOnEdit, state.notes) :
                applyPatchToNotesById(result.note, state.notes)
          };
        case ActionType.SUBMIT_NOTE_FAIL:
          return state;

        /* NEW_EMPTY_NOTE */
        case ActionType.NEW_EMPTY_NOTE:
          return {...state, notes: [createEmptyNote(), ...state.notes]};

        /* EDIT_NOTE */
        case ActionType.EDIT_NOTE:
          const {note} = action.payload.params;
          return {
            ...state,
            notes:
                applyPatchToNotesByIdx(note, state.noteIdxOnEdit, state.notes)
          };

        /* DELETE_NOTE */
        case ActionType.DELETE_NOTE_START:
          return state;
        case ActionType.DELETE_NOTE_SUCCEED:
          return {
            ...state,
            notes: deleteNoteById(action.payload.result.note.id, state.notes)
          };
        case ActionType.DELETE_NOTE_FAIL:
          return state;

        /* DELETE_UNSAVED_NOTE */
        case ActionType.DELETE_UNSAVED_NOTE:
          return {
            ...state,
            notes: deleteNoteByIdx(state.noteIdxOnEdit, state.notes)
          };

        /* CHANGE_NOTE_IDX_ON_EDIT */
        case ActionType.CHANGE_NOTE_IDX_ON_EDIT:
          return {...state, noteIdxOnEdit: action.payload.params.noteIdx};
        default: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _: never = action;
          return state;
        }
      }
    };

export default noteReducer;

export const selectNoteOnEdit = (state: NoteState) =>
    state.notes[state.noteIdxOnEdit];

const applyPatchToNotesById = (updatedNote: Note, notes: Note[]) =>
    notes.map(note => (note.id === updatedNote.id ? updatedNote : note));

const applyPatchToNotesByIdx =
    (updatedNote: Note, updatedNoteIdx: number, notes: Note[]) =>
        notes.map((note, idx) => (idx === updatedNoteIdx ? updatedNote : note));

const deleteNoteById = (noteId: number, notes: Note[]) =>
    notes.filter(note => note.id !== noteId);

const deleteNoteByIdx = (deletedNoteIdx: number, notes: Note[]) =>
    notes.filter((_, idx) => idx !== deletedNoteIdx);

const createEmptyNote = (): Note => ({
  id: NONE_ID,
  title: 'blank note',
  body: '',
  updated_at: '',
});
