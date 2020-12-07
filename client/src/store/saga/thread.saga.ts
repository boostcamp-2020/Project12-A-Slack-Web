import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'
import threadAPI from '@api/thread'
import channelAPI from '@api/channel'
import {
  GetThreadResponseType,
  GetChannelInfoResponseType,
} from '@type/thread.type'
import {
  GET_THREADS_REQUEST,
  GET_CHANNEL_INFO_REQUEST,
  CREATE_THREAD,
  getThreadsAsync,
  getChannelInfoAsync,
  createThread,
} from '../reducer/thread.reducer'
import { sendSocketCreateThread } from '../reducer/socket.reducer'

function* getThreadsSaga(action: ReturnType<typeof getThreadsAsync.request>) {
  try {
    const threads: GetThreadResponseType[] = yield call(
      threadAPI.getThreads,
      action.payload,
    )
    yield put(getThreadsAsync.success(threads))
  } catch (e) {
    yield put(getThreadsAsync.failure(e))
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

interface ChannelInfoResponseType {
  success: boolean
  data: GetChannelInfoResponseType
}

function* getCannelInfoSaga(
  action: ReturnType<typeof getChannelInfoAsync.request>,
) {
  try {
    const { success, data }: ChannelInfoResponseType = yield call(
      channelAPI.getChannelInfo,
      action.payload.channelId,
    )
    if (success) yield put(getChannelInfoAsync.success(data))
  } catch (e) {
    yield put(getChannelInfoAsync.failure(e))
  }
}

function* watchGetThreadsSaga() {
  yield takeLatest(GET_THREADS_REQUEST, getThreadsSaga)
}

function* watchCreateThreadSaga() {
  yield takeEvery(CREATE_THREAD, createThreadSaga)
}

function* watchGetCannelInfoSaga() {
  yield takeEvery(GET_CHANNEL_INFO_REQUEST, getCannelInfoSaga)
}

export default function* threadSaga() {
  yield all([
    fork(watchGetThreadsSaga),
    fork(watchCreateThreadSaga),
    fork(watchGetCannelInfoSaga),
  ])
}
