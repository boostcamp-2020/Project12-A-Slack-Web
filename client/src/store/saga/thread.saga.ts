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
import reactionAPI from '@api/reaction'
import { toast } from 'react-toastify'
import { GRANTED } from '@constant/index'
import { RootState } from '@store'
import { OnlySuccessResponseType } from '@type/response.type'
import {
  GetThreadResponseType,
  CreateThreadResponseType,
} from '@type/thread.type'
import { CreateReactionResponseType } from '@type/reaction.type'
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
  DELETE_MESSAGE,
  UPDATE_MESSAGE,
  RECEIVE_CREATE_THREAD,
  CREATE_REACTION,
  DELETE_REACTION,
  getThreads,
  createThread,
  deleteThread,
  updateThread,
  setCurrentThread,
  createMessage,
  deleteMessage,
  updateMessage,
  receiveCreateThread,
  receiveCreateMessage,
  RECEIVE_CREATE_MESSAGE,
  createReaction,
  deleteReaction,
} from '@store/reducer/thread.reducer'
import {
  sendSocketCreateThread,
  sendSocketDeleteThread,
  sendSocketUpdateThread,
  sendSocketCreateMessage,
  sendSocketDeleteMessage,
  sendSocketUpdateMessage,
  sendSocketCreateReaction,
  sendSocketDeleteReaction,
} from '@store/reducer/socket.reducer'
import {
  setChannelUnRead,
  setChannelRead,
} from '@store/reducer/channel.reducer'

function* getThreadsSaga(action: ReturnType<typeof getThreads.request>) {
  try {
    const threads: GetThreadResponseType[] = yield call(
      threadAPI.getThreads,
      action.payload,
    )
    yield put(
      getThreads.success({
        threadList: threads,
        channelId: action.payload.channelId,
      }),
    )
  } catch (e) {
    yield put(getThreads.failure(e))
  }
}

function* createThreadSaga(action: ReturnType<typeof createThread>) {
  try {
    const { success, data }: CreateThreadResponseType = yield call(
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
    const { success }: OnlySuccessResponseType = yield call(
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
    const { success }: OnlySuccessResponseType = yield call(
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

function* updateMessageSaga(action: ReturnType<typeof updateMessage>) {
  try {
    const { success } = yield call(messageAPI.updateMessage, action.payload)

    const { channelId } = yield select(
      (state: RootState) => state.threadStore.currentThread.thread,
    )
    if (success) {
      yield put(
        sendSocketUpdateMessage({
          channelId: +channelId,
          messageId: +action.payload.messageId,
        }),
      )
    }
  } catch (e) {
    toast.error('Failed to update message')
  }
}

const sendNotification = (name: string, body: string) => {
  return new Notification(`${name}님의 새 메시지`, { body })
}

function* receiveCreateThreadSaga(
  action: ReturnType<typeof receiveCreateThread>,
) {
  const { name } = yield select(
    (state: RootState) => state.userStore.currentUser,
  )
  const { id: channelId } = yield select(
    (state: RootState) => state.channelStore.currentChannel,
  )
  const { content } = action.payload.headMessage
  if (channelId !== action.payload.channelId) {
    try {
      yield put(setChannelUnRead({ channelId: action.payload.channelId }))
      if (Notification.permission === GRANTED) {
        sendNotification(name, content)
      }
    } catch (e) {
      console.log('Browser does not support notification.')
    }
  }
}

function* receiveCreateMessageSaga(
  action: ReturnType<typeof receiveCreateMessage>,
) {
  const { name, id: userId } = yield select(
    (state: RootState) => state.userStore.currentUser,
  )
  const { currentChannel } = yield select(
    (state: RootState) => state.channelStore,
  )
  const { thread: currentThread } = yield select(
    (state: RootState) => state.threadStore.currentThread,
  )
  const { thread, message, userIdList } = action.payload

  const isNotWatching =
    currentChannel?.id !== thread.channelId && currentThread?.id !== thread.id
  const isMyThread = thread.User.id === userId
  const isHaveMyReply = userIdList.some((id) => id === userId)

  if (isNotWatching && (isMyThread || isHaveMyReply)) {
    try {
      yield put(setChannelUnRead({ channelId: thread.channelId }))
      if (Notification.permission === GRANTED) {
        sendNotification(name, message.content)
      }
    } catch (e) {
      console.log('Browser does not support notification.')
    }
  }
}

function* createReactionSaga(action: ReturnType<typeof createReaction>) {
  try {
    const { success, data }: CreateReactionResponseType = yield call(
      reactionAPI.createReaction,
      action.payload,
    )
    if (success) {
      yield put(
        sendSocketCreateReaction({
          channelId: action.payload.channelId,
          messageId: action.payload.messageId,
          reactionId: +data.reactionId,
        }),
      )
    }
  } catch (e) {
    toast.error('Failed to create reaction')
  }
}

function* deleteReactionSaga(action: ReturnType<typeof deleteReaction>) {
  try {
    const { success } = yield call(reactionAPI.deleteReaction, action.payload)
    if (success) {
      const { channelId, messageId, reactionId } = action.payload
      yield put(
        sendSocketDeleteReaction({
          channelId,
          messageId,
          reactionId,
        }),
      )
    }
  } catch (e) {
    toast.error('Failed to delete reaction')
  }
}

function* watchGetThreadsSaga() {
  yield takeLatest(GET_THREADS_REQUEST, getThreadsSaga)
}

function* watchCreateThreadSaga() {
  yield takeLatest(CREATE_THREAD, createThreadSaga)
}

function* watchDeleteThreadSaga() {
  yield takeLatest(DELETE_THREAD, deleteThreadSaga)
}

function* watchUpdateThreadSaga() {
  yield takeLatest(UPDATE_THREAD, updateThreadSaga)
}

function* watchSetCurrentThreadSaga() {
  yield takeLatest(SET_CURRENT_THREAD_REQUEST, setCurrentThreadSaga)
}

function* watchCreateMessageSaga() {
  yield takeLatest(CREATE_MESSAGE, createMessageSaga)
}

function* watchDeleteMessageSaga() {
  yield takeLatest(DELETE_MESSAGE, deleteMessageSaga)
}

function* watchUpdateMessageSaga() {
  yield takeLatest(UPDATE_MESSAGE, updateMessageSaga)
}

function* watchReceiveCreateThreadSaga() {
  yield takeEvery(RECEIVE_CREATE_THREAD, receiveCreateThreadSaga)
}

function* watchReceiveCreateMessageSaga() {
  yield takeEvery(RECEIVE_CREATE_MESSAGE, receiveCreateMessageSaga)
}

function* watchCreateReactionSaga() {
  yield takeLatest(CREATE_REACTION, createReactionSaga)
}

function* watchDeleteReactionSaga() {
  yield takeLatest(DELETE_REACTION, deleteReactionSaga)
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
    fork(watchUpdateMessageSaga),
    fork(watchReceiveCreateThreadSaga),
    fork(watchReceiveCreateMessageSaga),
    fork(watchCreateReactionSaga),
    fork(watchDeleteReactionSaga),
  ])
}
