import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'
import threadAPI from '@api/thread'
import { GetThreadResponseType } from '@type/thread.type'
import {
  GET_THREADS_REQUEST,
  CREATE_THREAD,
  getThreads,
  createThread,
} from '../reducer/thread.reducer'
import { sendSocketCreateThread } from '../reducer/socket.reducer'

function* getThreadsSaga(action: ReturnType<typeof getThreads.request>) {
  try {
    const threads: GetThreadResponseType[] = yield call(
      threadAPI.getThreads,
      action.payload,
    )
    yield put(getThreads.success(threads))
  } catch (e) {
    yield put(getThreads.failure(e))
  }
}

interface ResponseType {
  success: boolean
  data: { threadId: string }
}

function* createThreadSaga(action: ReturnType<typeof createThread>) {
  try {
    const { success, data }: ResponseType = yield call(
      threadAPI.createThread,
      action.payload,
    )
    console.log('createThreadSaga: ', data)
    if (success)
      yield put(
        sendSocketCreateThread({
          channelId: +action.payload.channelId,
          threadId: +data.threadId,
        }),
      )
  } catch (e) {
    console.log('Failed to create thread')
  }
}

function* watchGetThreadsSaga() {
  yield takeLatest(GET_THREADS_REQUEST, getThreadsSaga)
}

function* watchCreateThreadSaga() {
  yield takeEvery(CREATE_THREAD, createThreadSaga)
}

export default function* threadSaga() {
  yield all([fork(watchGetThreadsSaga), fork(watchCreateThreadSaga)])
}
