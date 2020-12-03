import { call, put, takeEvery } from 'redux-saga/effects'
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

function* getChannelSaga(action: ReturnType<typeof getChannelsAsync.request>) {
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

export default function* channelSaga() {
  yield takeEvery(GET_CHANNELS, getChannelSaga)
  yield takeEvery(JOIN_CHANNEL, joinChannelSaga)
}
