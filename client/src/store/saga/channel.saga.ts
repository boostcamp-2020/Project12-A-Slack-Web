import { call, put, takeEvery, fork, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import channelAPI from '@api/channel'
import {
  getChannelsAsync,
  getChannels,
  createChannel,
  joinChannel,
  GET_CHANNELS,
  CREATE_CHANNEL,
  JOIN_CHANNEL,
} from '../reducer/channel.reducer'

function* getChannelsSaga(action: ReturnType<typeof getChannelsAsync.request>) {
  try {
    const { success, data } = yield call(channelAPI.getChannels, action.payload)
    if (success) console.log(data)
    yield put(getChannelsAsync.success(data))
  } catch (error) {
    yield put(getChannelsAsync.failure(error))
  }
}

function* joinChannelSaga(action: ReturnType<typeof joinChannel>) {
  try {
    const { success, data } = yield call(channelAPI.joinChannel, action.payload)
    if (success) toast.success('channel에 참가했습니다.')
  } catch (error) {
    toast.error('Failed to join channel')
  }
}

function* watchGetChannelsSaga() {
  yield takeEvery(GET_CHANNELS, getChannelsSaga)
}

function* watchJoinChannelSaga() {
  yield takeEvery(JOIN_CHANNEL, joinChannelSaga)
}

export default function* channelSaga() {
  yield all([fork(watchGetChannelsSaga), fork(watchJoinChannelSaga)])
}
