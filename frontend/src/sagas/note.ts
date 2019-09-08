import { select } from "redux-saga/effects";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";

import { getNotes, submitNote, SubmitType, deleteNote } from "../actions/note";
import { ActionType } from "../actions/types";
import api from "../api";
import { selectNoteOnEdit } from "../reducers/note";

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
  yield takeLatest(ActionType.GET_NOTES_START, runGetNotes);
}

/* SUBMIT_NOTE */
function* runSubmitNote(action: ReturnType<typeof submitNote.start>) {
  const { submitType } = action.payload;
  const note = yield select(state => selectNoteOnEdit(state.note));

  const apiCallback = getApiCallback(
    submitType === SubmitType.CREATE
      ? () => api.post("/api/v1/notes", note)
      : () => api.patch(`/api/v1/notes/${note.id}`, note),
    res => res.data.note
  );

  try {
    const resNote = yield call(apiCallback);
    yield put(submitNote.succeed({ submitType }, { note: resNote }));
  } catch (err) {
    yield put(submitNote.fail({ submitType }, err));
  }
}

export function* watchSubmitNote() {
  yield takeLatest(ActionType.SUBMIT_NOTE_START, runSubmitNote);
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
  yield takeLatest(ActionType.DELETE_NOTE_START, runDeleteNote);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetNotes),
    fork(watchSubmitNote),
    fork(watchDeleteNote)
  ]);
}
