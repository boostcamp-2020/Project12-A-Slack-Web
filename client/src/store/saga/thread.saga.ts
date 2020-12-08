import {
  call,
  put,
  takeEvery,
  takeLatest,
  fork,
  all,
  select,
} from 'redux-saga/effects'
import threadAPI from '@api/thread'
import { GetThreadResponseType } from '@type/thread.type'
import {
  GET_THREADS_REQUEST,
  CREATE_THREAD,
  DELETE_THREAD,
  UPDATE_THREAD,
  getThreads,
  createThread,
  deleteThread,
  updateThread,
} from '../reducer/thread.reducer'
import {
  sendSocketCreateThread,
  sendSocketDeleteThread,
} from '../reducer/socket.reducer'

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

function* deleteThreadSaga(action: ReturnType<typeof deleteThread>) {
  try {
    const { success }: ResponseType = yield call(
      threadAPI.deleteThread,
      action.payload,
    )
    const channelId = yield select(
      (state) => state.channelStore.currentChannel.id,
    )
    if (success)
      yield put(
        sendSocketDeleteThread({
          channelId: +channelId,
          threadId: +action.payload.threadId,
        }),
      )
  } catch (e) {
    console.log('Failed to create thread')
  }
}

function* updateThreadSaga(action: ReturnType<typeof updateThread>) {
  try {
    const { success }: ResponseType = yield call(
      threadAPI.updateThread,
      action.payload,
    )
    if (success) console.log('success update thread request')

    //   yield put(
    //     sendSocketDeleteThread({
    //       channelId: +channelId,
    //       threadId: +action.payload.threadId,
    //     }),
    //   )
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

function* watchDeleteThreadSaga() {
  yield takeEvery(DELETE_THREAD, deleteThreadSaga)
}

function* watchUpdateThreadSaga() {
  yield takeEvery(UPDATE_THREAD, updateThreadSaga)
}

export default function* threadSaga() {
  yield all([
    fork(watchGetThreadsSaga),
    fork(watchCreateThreadSaga),
    fork(watchDeleteThreadSaga),
    fork(watchUpdateThreadSaga),
  ])
}
