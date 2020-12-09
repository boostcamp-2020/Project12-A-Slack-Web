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
import messageAPI from '@api/message'
import { GetThreadResponseType } from '@type/thread.type'
import {
  GetMessagesResponseType,
  CreateMessageResponseType,
} from '@type/message.type'
import {
  GET_THREADS_REQUEST,
  CREATE_THREAD,
  DELETE_THREAD,
  UPDATE_THREAD,
  SET_CURRENT_THREAD_REQUEST,
  CREATE_MESSAGE,
  getThreads,
  createThread,
  deleteThread,
  updateThread,
  setCurrentThread,
  createMessage,
} from '../reducer/thread.reducer'
import {
  sendSocketCreateThread,
  sendSocketDeleteThread,
  sendSocketUpdateThread,
  sendSocketCreateMessage,
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
      messageAPI.updateMessage,
      action.payload,
    )
    if (success && action.payload.threadId) {
      yield put(
        sendSocketUpdateThread({
          channelId: +action.payload.channelId,
          threadId: +action.payload.threadId,
        }),
      )
    }
  } catch (e) {
    console.log('Failed to create thread')
  }
}

function* setCurrentThreadSaga(
  action: ReturnType<typeof setCurrentThread.request>,
) {
  try {
    const { success, data }: GetMessagesResponseType = yield call(
      messageAPI.getMessages,
      action.payload.id,
    )

    if (success) {
      yield put(
        setCurrentThread.success({ thread: action.payload, messageList: data }),
      )
    }
  } catch (error) {
    yield put(setCurrentThread.failure(error))
  }
}

function* createMessageSaga(action: ReturnType<typeof createMessage>) {
  try {
    const { success, data }: CreateMessageResponseType = yield call(
      messageAPI.createMessage,
      action.payload,
    )

    if (success) {
      yield put(
        sendSocketCreateMessage({
          channelId: +action.payload.channelId,
          threadId: +action.payload.threadId,
          messageId: +data.messageId,
        }),
      )
    }
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

function* watchSetCurrentThreadSaga() {
  yield takeEvery(SET_CURRENT_THREAD_REQUEST, setCurrentThreadSaga)
}

function* watchCreateMessageSaga() {
  yield takeEvery(CREATE_MESSAGE, createMessageSaga)
}

export default function* threadSaga() {
  yield all([
    fork(watchGetThreadsSaga),
    fork(watchCreateThreadSaga),
    fork(watchDeleteThreadSaga),
    fork(watchUpdateThreadSaga),
    fork(watchSetCurrentThreadSaga),
    fork(watchCreateMessageSaga),
  ])
}
