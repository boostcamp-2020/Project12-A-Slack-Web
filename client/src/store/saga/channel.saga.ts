import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import channelAPI from '@api/channel'
import { ChannelResponseType } from '@type/channel.type'
import {
  GET_CHANNELS_REQUEST,
  CREATE_CHANNEL,
  JOIN_CHANNEL_REQUEST,
  getChannels,
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

function* joinChannelSaga(action: ReturnType<typeof joinChannel.request>) {
  try {
    const { success } = yield call(channelAPI.joinChannel, action.payload)
    if (success) {
      yield put(
        joinChannel.success(action.payload.channel as ChannelResponseType),
      )
    }
  } catch (error) {
    toast.error('Failed to join channel')
    yield put(joinChannel.failure(error))
  }
}

function* watchGetChannelsSaga() {
  yield takeEvery(GET_CHANNELS_REQUEST, getChannelsSaga)
}

function* watchJoinChannelSaga() {
  yield takeLatest(JOIN_CHANNEL_REQUEST, joinChannelSaga)
}

export default function* channelSaga() {
  yield all([fork(watchGetChannelsSaga), fork(watchJoinChannelSaga)])
}
