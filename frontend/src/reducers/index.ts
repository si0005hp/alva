import { combineReducers } from "redux";
import noteReducer, { NoteState } from "./note";

export interface RootState {
  note: NoteState;
}

export default () =>
  combineReducers({
    note: noteReducer
  });
