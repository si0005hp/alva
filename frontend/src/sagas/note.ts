import { all, call, fork, put, takeLatest } from "redux-saga/effects";

import { getNotes, submitNote, SubmitType, deleteNote } from "../actions/note";
import * as Action from "../actions/types";
import api from "../api";

// TODO any type parameter
type ApiRequest = () => Promise<any>;
type HandleResponse = (response: any) => any;

const apiCallback = async (
  request: ApiRequest,
  handleResponse: HandleResponse
) => {
  try {
    const res = await request();
    if (res.status !== 200) {
      throw new Error("Server Error");
    }
    return handleResponse(res);
  } catch (err) {
    throw err;
  }
};

const getApiCallback = (
  request: ApiRequest,
  handleResponse: HandleResponse
) => () => apiCallback(request, handleResponse);

/* GET_NOTES */
function* runGetNotes(action: ReturnType<typeof getNotes.start>) {
  const apiCallback = getApiCallback(
    () => api.get("/api/v1/notes"),
    res => res.data.notes
  );

  try {
    const notes = yield call(apiCallback);
    yield put(getNotes.succeed({ notes }));
  } catch (err) {
    yield put(getNotes.fail(err));
  }
}

export function* watchGetNotes() {
  yield takeLatest(Action.GET_NOTES_START, runGetNotes);
}

/* SUBMIT_NOTE */
function* runSubmitNote(action: ReturnType<typeof submitNote.start>) {
  const { submitType, note } = action.payload;

  const apiCallback = getApiCallback(
    submitType === SubmitType.CREATE
      ? () => api.post("/api/v1/notes", note)
      : () => api.patch(`/api/v1/notes/${note.id}`, note),
    res => res.data.note
  );

  try {
    const resNote = yield call(apiCallback);
    yield put(submitNote.succeed({ submitType, note }, { note: resNote }));
  } catch (err) {
    yield put(submitNote.fail({ submitType, note }, err));
  }
}

export function* watchSubmitNote() {
  yield takeLatest(Action.SUBMIT_NOTE_START, runSubmitNote);
}

/* DELETE_NOTE */
function* runDeleteNote(action: ReturnType<typeof deleteNote.start>) {
  const { noteId } = action.payload;

  const apiCallback = getApiCallback(
    () => api.delete(`/api/v1/notes/${noteId}`),
    res => res.data.note
  );

  try {
    const note = yield call(apiCallback);
    yield put(deleteNote.succeed({ noteId }, { note }));
  } catch (err) {
    yield put(deleteNote.fail({ noteId }, err));
  }
}

export function* watchDeleteNote() {
  yield takeLatest(Action.DELETE_NOTE_START, runDeleteNote);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetNotes),
    fork(watchSubmitNote),
    fork(watchDeleteNote)
  ]);
}
