import {all, call, fork, put, takeLatest} from 'redux-saga/effects';

import {getNotes, updateNote} from '../actions/note';
import * as Action from '../actions/types';
import api from '../api';
import {Note} from '../types';

function* runGetNotes(action: ReturnType<typeof getNotes.start>) {
  const apiCall = async () => {
    try {
      const res = await api.get('/api/v1/notes');
      if (res.status !== 200) {
        throw new Error('Server Error');
      }
      const notes: Note[] = res.data.notes;

      return notes;
    } catch (err) {
      throw err;
    }
  };

  try {
    const notes = yield call(apiCall);
    yield put(getNotes.succeed({notes}));
  } catch (err) {
    yield put(getNotes.fail(err));
  }
}

export function* watchGetNotes() {
  yield takeLatest(Action.GET_NOTES_START, runGetNotes);
}

function* runUpdateNote(action: ReturnType<typeof updateNote.start>) {
  const apiCall = async (note: Note) => {
    try {
      const res = await api.patch(`/api/v1/notes/${note.id}`, note);
      if (res.status !== 200) {
        throw new Error('Server Error');
      }
      return res.data.note;
    } catch (err) {
      throw err;
    }
  };

  try {
    const note = yield call(apiCall, action.payload.note);
    yield put(updateNote.succeed({note: action.payload.note}, {note}));
  } catch (err) {
    yield put(updateNote.fail({note: action.payload.note}, err));
  }
}

export function* watchUpdateNote() {
  yield takeLatest(Action.UPDATE_NOTE_START, runUpdateNote);
}

export default function* rootSaga() {
  yield all([fork(watchGetNotes), fork(watchUpdateNote)]);
}
