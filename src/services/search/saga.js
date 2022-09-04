import {
  takeEvery,
  select,
  call,
  put,
  throttle
} from "@redux-saga/core/effects";
import { searchAddresses } from "./api";
import { selectQuery } from "./selectors";
import { searchSuccess, searchFailure, search } from "./actions";
function* searchSaga() {
  console.log("searchSaga");
  const query = yield select(selectQuery);
  try {
    const results = yield call(searchAddresses, query);
    yield put(searchSuccess(results));
  } catch (err) {
    console.log(err);
    yield put(searchFailure(err));
  }
}
function* updateQuerySaga() {
  const query = yield select(selectQuery);
  if (query.length > 3) {
    console.log("putSearch");
    yield put(search());
  }
}
export function* rootSaga() {
  yield takeEvery("search", searchSaga);
  yield takeEvery("updateQuery", updateQuerySaga);
  // yield throttle(1000, "updateQuery", updateQuerySaga);
}
