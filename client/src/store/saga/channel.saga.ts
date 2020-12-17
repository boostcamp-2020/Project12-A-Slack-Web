import {
  call,
  put,
  takeEvery,
  takeLatest,
  fork,
  all,
  select,
} from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { RootState } from '@store'
import channelAPI from '@api/channel'
import { ChannelType, GetChannelResponseType } from '@type/channel.type'
import {
  sendSocketDeleteMember,
  sendSocketJoinRoom,
  sendSocketLeaveRoom,
  connectSocket,
} from '@store/reducer/socket.reducer'
import {
  GET_CHANNELS_REQUEST,
  GET_CURRENT_CHANNEL_REQUEST,
  JOIN_CHANNEL_REQUEST,
  JOIN_MEMBERS_TO_CHANNEL_REQUEST,
  DELETE_MEMBER,
  RECEIVE_DELETE_MEMBER,
  CREATE_CHANNEL_REQUEST,
  CREATE_DM_REQUEST,
  getChannels,
  getCurrentChannel,
  createChannel,
  joinChannel,
  joinMembersToChannel,
  deleteMember,
  receiveDeleteMember,
  setChannelList,
  createDM,
} from '../reducer/channel.reducer'

function* getChannelsSaga(action: ReturnType<typeof getChannels.request>) {
  try {
    const { success, data }: GetChannelResponseType = yield call(
      channelAPI.getChannels,
      action.payload,
    )
    if (success) {
      yield put(getChannels.success(data))
      yield put(
        sendSocketJoinRoom({ channelIdList: data.map((item) => item.id) }),
      )
    }
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

function* createDMSaga(action: ReturnType<typeof createDM.request>) {
  try {
    const { success, data } = yield call(
      channelAPI.createNewChannel,
      action.payload,
    )
    const { id: currentUserId } = yield select(
      (state: RootState) => state.userStore.currentUser,
    )
    if (success) {
      const { userList, onSuccess } = action.payload
      const userListExceptCurrent = userList.filter(
        ({ id }) => id !== currentUserId,
      )
      yield put(createDM.success(data))
      yield put(sendSocketJoinRoom({ channelIdList: [data.id] }))
      yield put(
        joinMembersToChannel.request({
          channelId: data.id,
          userList: userListExceptCurrent,
        }),
      )
      if (onSuccess) onSuccess(data.id)
    }
  } catch (error) {
    yield put(createDM.failure(error))
  }
}

function* joinChannelSaga(action: ReturnType<typeof joinChannel.request>) {
  try {
    const { success } = yield call(channelAPI.joinChannel, action.payload)
    if (success) {
      const { channel: joinedChannel, onSuccess } = action.payload
      yield put(joinChannel.success(joinedChannel as ChannelType))
      yield put(sendSocketJoinRoom({ channelIdList: [joinedChannel.id] }))
      if (onSuccess) onSuccess()
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
      if (action.payload.onSuccess) action.payload.onSuccess!()
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

function* receiveDeleteMemberSaga(
  action: ReturnType<typeof receiveDeleteMember>,
) {
  try {
    const {
      loginUserId,
      workspaceId,
      channelList,
      currentChannelId,
    } = yield select((state) => {
      return {
        loginUserId: state.userStore.currentUser.id,
        workspaceId: state.workspaceStore.currentWorkspace.id,
        channelList: state.channelStore.channelList,
        currentChannelId: state.channelStore.currentChannel.id,
      }
    })
    const {
      userId,
      channelInfo: { id: channelId },
    } = action.payload

    if (loginUserId === userId) {
      const newChannelList = channelList.filter(
        (channel: ChannelType) => channel.id !== channelId,
      )
      yield put(setChannelList({ channelList: newChannelList }))
      yield put(sendSocketLeaveRoom({ channelId }))
      toast.success(
        `You have been removed from the private channel ${action.payload.channelInfo.name}`,
      )
      if (currentChannelId === channelId) {
        window.location.href = `/workspace/${workspaceId}/channel-browser`
      }
    }
  } catch (error) {
    console.log(error)
  }
}

function* createChannelSage(action: ReturnType<typeof createChannel.request>) {
  try {
    const { success, data } = yield call(
      channelAPI.createNewChannel,
      action.payload,
    )
    if (success) {
      const { onSuccess } = action.payload
      yield put(createChannel.success(data))
      yield put(sendSocketJoinRoom({ channelIdList: [data.id] }))
      if (onSuccess) onSuccess(data.id)
    }
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

function* watchRecieveDeleteMemberSaga() {
  yield takeLatest(RECEIVE_DELETE_MEMBER, receiveDeleteMemberSaga)
}

function* watchJoinMembersToChannelSaga() {
  yield takeLatest(JOIN_MEMBERS_TO_CHANNEL_REQUEST, joinMembersToChannelSaga)
}

function* watchCreateDMSaga() {
  yield takeLatest(CREATE_DM_REQUEST, createDMSaga)
}

export default function* channelSaga() {
  yield all([
    fork(watchGetChannelsSaga),
    fork(watchGetCurrentChannelSaga),
    fork(watchJoinChannelSaga),
    fork(watchJoinMembersToChannelSaga),
    fork(watchDeleteMemberSaga),
    fork(watchRecieveDeleteMemberSaga),
    fork(watchCreateChannelSaga),
    fork(watchCreateDMSaga),
  ])
}
