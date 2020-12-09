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
import { toast } from 'react-toastify'
import { GetThreadResponseType } from '@type/thread.type'
import { OnlySuccessResponseType } from '@type/response.type'
import { RootState } from '@store'
import {
  GetMessagesResponseType,
  CreateMessageResponseType,
} from '@type/message.type'
import {
  GET_THREADS_REQUEST,
  CREATE_THREAD,
  DELETE_THREAD,
  UPDATE_THREAD,
  DELETE_MESSAGE,
  SET_CURRENT_THREAD_REQUEST,
  CREATE_MESSAGE,
  getThreads,
  createThread,
  deleteThread,
  updateThread,
  setCurrentThread,
  createMessage,
  deleteMessage,
} from '@store/reducer/thread.reducer'
import {
  sendSocketCreateThread,
  sendSocketDeleteThread,
  sendSocketUpdateThread,
  sendSocketCreateMessage,
  sendSocketDeleteMessage,
} from '@store/reducer/socket.reducer'

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
    if (success)
      yield put(
        sendSocketCreateThread({
          channelId: +action.payload.channelId,
          threadId: +data.threadId,
        }),
      )
  } catch (e) {
    toast.error('Failed to create thread')
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
    toast.error('Failed to delete thread')
  }
}

function* updateThreadSaga(action: ReturnType<typeof updateThread>) {
  try {
    const { success }: ResponseType = yield call(
      messageAPI.updateMessage,
      action.payload,
    )
    const { id: channelId } = yield select(
      (state: RootState) => state.channelStore.currentChannel,
    )
    if (success && action.payload.threadId) {
      yield put(
        sendSocketUpdateThread({
          channelId: +channelId,
          threadId: +action.payload.threadId,
        }),
      )
    }
  } catch (e) {
    toast.error('Failed to update thread')
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
    toast.error('Failed to create message')
  }
}

function* deleteMessageSaga(action: ReturnType<typeof deleteMessage>) {
  try {
    const { success } = yield call(messageAPI.deleteMessage, action.payload)
    const { channelId, id: threadId } = yield select(
      (state: RootState) => state.threadStore.currentThread.thread,
    )
    if (success) {
      yield put(
        sendSocketDeleteMessage({
          channelId: +channelId,
          threadId: +threadId,
          messageId: +action.payload.messageId,
        }),
      )
    }
  } catch (e) {
    toast.error('Failed to delete message')
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

function* watchDeleteMessageSaga() {
  yield takeEvery(DELETE_MESSAGE, deleteMessageSaga)
}

export default function* threadSaga() {
  yield all([
    fork(watchGetThreadsSaga),
    fork(watchCreateThreadSaga),
    fork(watchDeleteThreadSaga),
    fork(watchUpdateThreadSaga),
    fork(watchSetCurrentThreadSaga),
    fork(watchCreateMessageSaga),
    fork(watchDeleteMessageSaga),
  ])
}
