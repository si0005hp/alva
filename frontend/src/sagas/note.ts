import {all, call, fork, put, takeLatest} from 'redux-saga/effects';

import {getNotes, submitNote, SubmitType} from '../actions/note';
import * as Action from '../actions/types';
import api from '../api';
import {Note} from '../types';

/* GET_NOTES */
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

/* SUBMIT_NOTE */
function* runSubmitNote(action: ReturnType<typeof submitNote.start>) {
  const {submitType, note} = action.payload;

  const apiCall = async (submitType: SubmitType, note: Note) => {
    try {
      const res = submitType === SubmitType.CREATE ?
          await api.post('/api/v1/notes', note) :
          await api.patch(`/api/v1/notes/${note.id}`, note);
      if (res.status !== 200) {
        throw new Error('Server Error');
      }
      return res.data.note;
    } catch (err) {
      throw err;
    }
  };

  try {
    const resNote = yield call(apiCall, submitType, note);
    yield put(submitNote.succeed({submitType, note}, {note: resNote}));
  } catch (err) {
    yield put(submitNote.fail({submitType, note}, err));
  }
}

export function* watchSubmitNote() {
  yield takeLatest(Action.SUBMIT_NOTE_START, runSubmitNote);
}

export default function* rootSaga() {
  yield all([fork(watchGetNotes), fork(watchSubmitNote)]);
}
