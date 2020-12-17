import {
  createAction,
  ActionType,
  createReducer,
  createAsyncAction,
} from 'typesafe-actions'
import { AxiosError } from 'axios'
import {
  ChannelRequestType,
  ChannelType,
  CurrentChannelType,
  CreateChannelRequestType,
  JoinChannelRequestType,
  JoinMembersToChannelRequestType,
  DeleteMemberRequestType,
  CreateDMRequestType,
} from '@type/channel.type'

export interface ChannelState {
  channelList: ChannelType[]
  currentChannel: CurrentChannelType
  loading: boolean
  error: AxiosError | null
}

const initialState: ChannelState = {
  channelList: [],
  currentChannel: {
    id: 0,
    name: '',
    type: 'PUBLIC',
    createdAt: '',
    updatedAt: '',
    memberCount: 0,
    memberMax3: [],
  },
  loading: true,
  error: null,
}

export const GET_CHANNELS_REQUEST = 'channel/GET_CHANNELS_REQUEST' as const
const GET_CHANNELS_SUCCESS = 'channel/GET_CHANNELS_SUCCESS' as const
const GET_CHANNELS_ERROR = 'channel/GET_CHANNELS_ERROR' as const

export const JOIN_CHANNEL_REQUEST = 'channel/JOIN_CHANNEL_REQUEST' as const
const JOIN_CHANNEL_SUCCESS = 'channel/JOIN_CHANNEL_SUCCESS' as const
const JOIN_CHANNEL_ERROR = 'channel/JOIN_CHANNEL_ERROR' as const

export const JOIN_MEMBERS_TO_CHANNEL_REQUEST = 'channel/JOIN_MEMBERS_TO_CHANNEL_REQUEST' as const
const JOIN_MEMBERS_TO_CHANNEL_SUCCESS = 'channel/JOIN_MEMBERS_TO_CHANNEL_SUCCESS' as const
const JOIN_MEMBERS_TO_CHANNEL_ERROR = 'channel/JOIN_MEMBERS_TO_CHANNEL_ERROR' as const

export const RECEIVE_ADD_MEMBER = 'channel/RECEIVE_ADD_MEMBER' as const

export const DELETE_MEMBER = 'channel/DELETE_MEMBER' as const
export const RECEIVE_DELETE_MEMBER = 'channel/RECEIVE_DELETE_MEMBER' as const

export const CREATE_CHANNEL_REQUEST = 'channel/CREATE_CHANNEL_REQUEST' as const
const CREATE_CHANNEL_SUCCESS = 'channel/CREATE_CHANNEL_SUCCESS' as const
const CREATE_CHANNEL_ERROR = 'channel/CREATE_CHANNEL_ERROR' as const

export const GET_CURRENT_CHANNEL_REQUEST = 'channel/GET_CURRENT_CHANNEL_REQUEST' as const
const GET_CURRENT_CHANNEL_SUCCESS = 'channel/GET_CURRENT_CHANNEL_SUCCESS' as const
const GET_CURRENT_CHANNEL_ERROR = 'channel/GET_CURRENT_CHANNEL_ERROR' as const

export const SET_CHANNEL_UNREAD = 'channel/SET_CHANNEL_UNREAD' as const
export const SET_CHANNEL_READ = 'channel/SET_CHANNEL_READ' as const

export const SET_CHANNEL_LIST = 'channel/SET_CHANNEL_LIST' as const

export const CREATE_DM_REQUEST = 'channel/CREATE_DM_REQUEST' as const
const CREATE_DM_SUCCESS = 'channel/CREATE_DM_SUCCESS' as const
const CREATE_DM_ERROR = 'channel/CREATE_DM_ERROR' as const

export const getChannels = createAsyncAction(
  GET_CHANNELS_REQUEST,
  GET_CHANNELS_SUCCESS,
  GET_CHANNELS_ERROR,
)<ChannelRequestType, ChannelType[], AxiosError>()

export const joinChannel = createAsyncAction(
  JOIN_CHANNEL_REQUEST,
  JOIN_CHANNEL_SUCCESS,
  JOIN_CHANNEL_ERROR,
)<JoinChannelRequestType, ChannelType, AxiosError>()

export const joinMembersToChannel = createAsyncAction(
  JOIN_MEMBERS_TO_CHANNEL_REQUEST,
  JOIN_MEMBERS_TO_CHANNEL_SUCCESS,
  JOIN_MEMBERS_TO_CHANNEL_ERROR,
)<
  JoinMembersToChannelRequestType,
  JoinMembersToChannelRequestType,
  AxiosError
>()

export const receiveAddMember = createAction(RECEIVE_ADD_MEMBER)<{
  channelInfo: CurrentChannelType
  userIdList: number[]
}>()

export const deleteMember = createAction(DELETE_MEMBER)<
  DeleteMemberRequestType
>()
export const receiveDeleteMember = createAction(RECEIVE_DELETE_MEMBER)<{
  channelList: ChannelType[]
  channelInfo: CurrentChannelType
  userId: number
}>()

export const createChannel = createAsyncAction(
  CREATE_CHANNEL_REQUEST,
  CREATE_CHANNEL_SUCCESS,
  CREATE_CHANNEL_ERROR,
)<CreateChannelRequestType, ChannelType, AxiosError>()

export const getCurrentChannel = createAsyncAction(
  GET_CURRENT_CHANNEL_REQUEST,
  GET_CURRENT_CHANNEL_SUCCESS,
  GET_CURRENT_CHANNEL_ERROR,
)<{ channelId: number }, CurrentChannelType, AxiosError>()

export const setChannelUnRead = createAction(SET_CHANNEL_UNREAD)<{
  channelId: number
}>()
export const setChannelRead = createAction(SET_CHANNEL_READ)<{
  channelId: number
}>()

export const setChannelList = createAction(SET_CHANNEL_LIST)<{
  channelList: ChannelType[]
}>()

export const createDM = createAsyncAction(
  CREATE_DM_REQUEST,
  CREATE_DM_SUCCESS,
  CREATE_DM_ERROR,
)<CreateDMRequestType, ChannelType, AxiosError>()

const actions = {
  getChannelsRequest: getChannels.request,
  getChannelsSuccess: getChannels.success,
  getChannelsError: getChannels.failure,
  joinChannelRequest: joinChannel.request,
  joinChannelSuccess: joinChannel.success,
  joinChannelError: joinChannel.failure,
  joinMembersToChannelRequest: joinMembersToChannel.request,
  joinMembersToChannelSuccess: joinMembersToChannel.success,
  joinMembersToChannelError: joinMembersToChannel.failure,
  receiveAddMember,
  deleteMember,
  receiveDeleteMember,
  createChannelRequest: createChannel.request,
  createChannelSuccess: createChannel.success,
  createChannelError: createChannel.failure,
  getCurrentChannelRequest: getCurrentChannel.request,
  getCurrentChannelSuccess: getCurrentChannel.success,
  getCurrentChannelError: getCurrentChannel.failure,
  setChannelUnRead,
  setChannelRead,
  setChannelList,
  createDMRequest: createDM.request,
  createDMSuccss: createDM.success,
  createDMError: createDM.failure,
}

export type ChannelAction = ActionType<typeof actions>

const reducer = createReducer<ChannelState, ChannelAction>(initialState, {
  [GET_CHANNELS_REQUEST]: (state, _) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [GET_CHANNELS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    channelList: action.payload,
  }),
  [GET_CHANNELS_ERROR]: (state, action) => ({
    ...state,
    channelList: [],
    loading: false,
    error: action.payload,
  }),
  [JOIN_CHANNEL_REQUEST]: (state, _) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [JOIN_CHANNEL_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    channelList: [...state.channelList, action.payload],
  }),
  [JOIN_CHANNEL_ERROR]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [JOIN_MEMBERS_TO_CHANNEL_REQUEST]: (state, _) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [JOIN_MEMBERS_TO_CHANNEL_SUCCESS]: (state, action) => {
    const { userList, channelId } = action.payload
    const sameChannel = channelId === state.currentChannel.id
    const newMemberCount =
      state.currentChannel.memberCount + (sameChannel ? userList.length : 0)
    const newMemberMax3 =
      sameChannel && state.currentChannel.memberMax3.length < 3
        ? [...state.currentChannel.memberMax3, ...userList].slice(0, 3)
        : state.currentChannel.memberMax3
    return {
      ...state,
      loading: false,
      currentChannel: {
        ...state.currentChannel,
        memberCount: newMemberCount,
        memberMax3: newMemberMax3,
      },
      error: null,
    }
  },
  [JOIN_MEMBERS_TO_CHANNEL_ERROR]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),

  [RECEIVE_DELETE_MEMBER]: (state, action) => {
    const { channelInfo } = action.payload
    if (state.currentChannel.id === channelInfo.id) {
      return {
        ...state,
        currentChannel: { ...channelInfo },
      }
    }
    return {
      ...state,
    }
  },

  [GET_CURRENT_CHANNEL_REQUEST]: (state, _) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [GET_CURRENT_CHANNEL_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    currentChannel: action.payload,
  }),
  [GET_CURRENT_CHANNEL_ERROR]: (state, action) => ({
    ...state,
    currentChannel: { ...state.currentChannel },
    loading: false,
    error: action.payload,
  }),
  [CREATE_CHANNEL_REQUEST]: (state, _) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [CREATE_CHANNEL_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    channelList: [...state.channelList, action.payload],
  }),
  [CREATE_CHANNEL_ERROR]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [CREATE_DM_REQUEST]: (state, _) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [CREATE_DM_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    channelList: [...state.channelList, action.payload],
  }),
  [CREATE_DM_ERROR]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [SET_CHANNEL_UNREAD]: (state, action) => ({
    ...state,
    channelList: state.channelList.map((channel) => {
      if (channel.id === action.payload.channelId)
        return { ...channel, unRead: true }
      return channel
    }),
  }),
  [SET_CHANNEL_READ]: (state, action) => ({
    ...state,
    channelList: state.channelList.map((channel) => {
      if (channel.id === action.payload.channelId)
        return { ...channel, unRead: false }
      return channel
    }),
  }),
  [SET_CHANNEL_LIST]: (state, action) => ({
    ...state,
    channelList: [...action.payload.channelList],
  }),
})

export default reducer
