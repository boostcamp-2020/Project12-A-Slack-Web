import { call, put, takeEvery } from 'redux-saga/effects'
import threadAPI from '@api/thread'
import {
  ThreadType,
  GET_THREADS,
  CREATE_THREAD,
  getThreadsAsync,
  createThread,
} from '../reducer/thread.reducer'

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

interface ResponseType {
  success: boolean
  data: object
}

function* createThreadSaga(action: ReturnType<typeof createThread>) {
  try {
    const { success, data }: ResponseType = yield call(
      threadAPI.createThread,
      action.payload,
    )
    console.log(data)
    // if (success)  threadId 가지고 소켓 이벤트 전송
    // 더이상 나가지 않고 여기서 끝
  } catch (e) {
    console.log('Failed to create thread')
  }
}

export default function* threadSaga() {
  yield takeEvery(GET_THREADS, getThreadsSaga)
  yield takeEvery(CREATE_THREAD, createThreadSaga)
}
