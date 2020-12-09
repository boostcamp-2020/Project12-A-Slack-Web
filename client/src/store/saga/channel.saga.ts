import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import channelAPI from '@api/channel'
import { ChannelType } from '@type/channel.type'
import { sendSocketDeleteMember } from '@store/reducer/socket.reducer'
import {
  GET_CHANNELS_REQUEST,
  GET_CURRENT_CHANNEL_REQUEST,
  JOIN_CHANNEL_REQUEST,
  JOIN_MEMBERS_TO_CHANNEL_REQUEST,
  DELETE_MEMBER,
  CREATE_CHANNEL_REQUEST,
  getChannels,
  getCurrentChannel,
  createChannel,
  joinChannel,
  joinMembersToChannel,
  deleteMember,
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

function* joinChannelSaga(action: ReturnType<typeof joinChannel.request>) {
  try {
    const { success } = yield call(channelAPI.joinChannel, action.payload)
    if (success) {
      yield put(joinChannel.success(action.payload.channel as ChannelType))
    }
  } catch (error) {
    toast.error('Failed to join channel')
    yield put(joinChannel.failure(error))
  }
}

function* joinMembersToChannelSaga(
  action: ReturnType<typeof joinMembersToChannel.request>,
) {
  try {
    const { success } = yield call(
      channelAPI.joinMembersToChannel,
      action.payload,
    )
    if (success) {
      action.payload.onSuccess!()
      yield put(joinMembersToChannel.success(action.payload))
    }
  } catch (error) {
    toast.error('Failed to add people to channel')
    yield put(joinMembersToChannel.failure(error))
  }
}

function* deleteMemberSaga(action: ReturnType<typeof deleteMember>) {
  try {
    const { success } = yield call(channelAPI.deleteMember, action.payload)
    if (success) {
      yield put(
        sendSocketDeleteMember({
          channelId: +action.payload.channelId,
          userId: +action.payload.userId,
        }),
      )
    }
  } catch (error) {
    toast.error('Failed to delete member from channel')
  }
}

function* createChannelSage(action: ReturnType<typeof createChannel.request>) {
  try {
    const { success, data } = yield call(
      channelAPI.createNewChannel,
      action.payload,
    )
    console.log(data)
    if (success) yield put(createChannel.success(data))
  } catch (error) {
    yield put(createChannel.failure(error))
  }
}

function* watchGetChannelsSaga() {
  yield takeEvery(GET_CHANNELS_REQUEST, getChannelsSaga)
}

function* watchGetCurrentChannelSaga() {
  yield takeEvery(GET_CURRENT_CHANNEL_REQUEST, getCurrentChannelSaga)
}

function* watchCreateChannelSaga() {
  yield takeLatest(CREATE_CHANNEL_REQUEST, createChannelSage)
}

function* watchJoinChannelSaga() {
  yield takeLatest(JOIN_CHANNEL_REQUEST, joinChannelSaga)
}

function* watchDeleteMemberSaga() {
  yield takeLatest(DELETE_MEMBER, deleteMemberSaga)
}

function* watchJoinMembersToChannelSaga() {
  yield takeLatest(JOIN_MEMBERS_TO_CHANNEL_REQUEST, joinMembersToChannelSaga)
}

export default function* channelSaga() {
  yield all([
    fork(watchGetChannelsSaga),
    fork(watchGetCurrentChannelSaga),
    fork(watchJoinChannelSaga),
    fork(watchJoinMembersToChannelSaga),
    fork(watchDeleteMemberSaga),
    fork(watchCreateChannelSaga),
  ])
}
