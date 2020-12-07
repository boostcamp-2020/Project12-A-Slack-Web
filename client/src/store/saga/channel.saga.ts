import { call, put, takeEvery, fork, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import channelAPI from '@api/channel'
import {
  GET_CHANNELS_REQUEST,
  GET_CURRENT_CHANNEL_REQUEST,
  CREATE_CHANNEL,
  JOIN_CHANNEL,
  getChannels,
  getCurrentChannel,
  createChannel,
  joinChannel,
} from '../reducer/channel.reducer'

function* getChannelsSaga(action: ReturnType<typeof getChannels.request>) {
  try {
    const { success, data } = yield call(channelAPI.getChannels, action.payload)
    if (success) console.log(data)
    yield put(getChannels.success(data))
  } catch (error) {
    yield put(getChannels.failure(error))
  }
}

function* getCurrentChannelSaga(
  action: ReturnType<typeof getCurrentChannel.request>,
) {
  try {
    const { success, data } = yield call(
      channelAPI.getChannelInfo,
      action.payload.channelId,
    )
    if (success) yield put(getCurrentChannel.success(data))
  } catch (error) {
    yield put(getCurrentChannel.failure(error))
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
  yield takeEvery(GET_CHANNELS_REQUEST, getChannelsSaga)
}

function* watchGetCurrentChannelSaga() {
  yield takeEvery(GET_CURRENT_CHANNEL_REQUEST, getCurrentChannelSaga)
}

function* watchJoinChannelSaga() {
  yield takeEvery(JOIN_CHANNEL, joinChannelSaga)
}

export default function* channelSaga() {
  yield all([
    fork(watchGetChannelsSaga),
    fork(watchGetCurrentChannelSaga),
    fork(watchJoinChannelSaga),
  ])
}
