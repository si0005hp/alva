import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import * as Action from "../actions/types";
import { getNotes } from "../actions/note";
import api from "../api";
import { Note } from "../types";

function* runGetNotes(action: ReturnType<typeof getNotes.start>) {
  const apiCall = async () => {
    try {
      const res = await api.get("/api/v1/notes");
      if (res.status !== 200) {
        throw new Error("Server Error");
      }
      const notes: Note[] = res.data.notes;

      return notes;
    } catch (err) {
      throw err;
    }
  };

  try {
    const notes = yield call(apiCall);
    yield put(getNotes.succeed({ notes }));
  } catch (err) {
    yield put(getNotes.fail({ err }));
  }
}

export function* watchGetNotes() {
  yield takeLatest(Action.GET_NOTES_START, runGetNotes);
}

export default function* rootSaga() {
  yield all([fork(watchGetNotes)]);
}
