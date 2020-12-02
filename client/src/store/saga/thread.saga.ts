import { call, put, takeEvery } from 'redux-saga/effects'
import threadAPI from '@api/thread'
import { GET_THREADS, getThreadsAsync, ThreadType } from '../thread.store'

function* getThreadsSaga(action: ReturnType<typeof getThreadsAsync.request>) {
  try {
    const threads: ThreadType[] = yield call(
      threadAPI.getThreads,
      action.payload,
    )
    yield put(getThreadsAsync.success(threads))
  } catch (e) {
    yield put(getThreadsAsync.failure(e))
  }
}

export default function* threadSaga() {
  yield takeEvery(GET_THREADS, getThreadsSaga)
}
