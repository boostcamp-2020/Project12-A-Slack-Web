import {
  createAction,
  ActionType,
  createReducer,
  createAsyncAction,
} from 'typesafe-actions'
import { AxiosError } from 'axios'
import { WorkspaceResponseType } from '@type/workspace.type'
import {
  ChannelRequestType,
  ChannelType,
  CurrentChannelType,
  CreateChannelRequestType,
  JoinChannelRequestType,
} from '@type/channel.type'

export interface ChannelState {
  channelList: ChannelType[]
  currentChannel: CurrentChannelType
  workspaceInfo: WorkspaceResponseType | null
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
  // TODO: move workspaceInfo to workspace store
  workspaceInfo: null,
  loading: true,
  error: null,
}

export const GET_CHANNELS_REQUEST = 'channel/GET_CHANNELS_REQUEST' as const
const GET_CHANNELS_SUCCESS = 'channel/GET_CHANNELS_SUCCESS' as const
const GET_CHANNELS_ERROR = 'channel/GET_CHANNELS_ERROR' as const
export const CREATE_CHANNEL = 'channel/CREATE_CHANNEL' as const
export const JOIN_CHANNEL = 'channel/JOIN_CHANNEL' as const
export const GET_CURRENT_CHANNEL_REQUEST = 'thread/GET_CURRENT_CHANNEL_REQUEST' as const
const GET_CURRENT_CHANNEL_SUCCESS = 'thread/GET_CURRENT_CHANNEL_SUCCESS' as const
const GET_CURRENT_CHANNEL_ERROR = 'thread/GET_CURRENT_CHANNEL_ERROR' as const

export const getChannels = createAsyncAction(
  GET_CHANNELS_REQUEST,
  GET_CHANNELS_SUCCESS,
  GET_CHANNELS_ERROR,
)<ChannelRequestType, ChannelType[], AxiosError>()
export const createChannel = createAction(CREATE_CHANNEL)<
  CreateChannelRequestType
>()
export const joinChannel = createAction(JOIN_CHANNEL)<JoinChannelRequestType>()
export const getCurrentChannel = createAsyncAction(
  GET_CURRENT_CHANNEL_REQUEST,
  GET_CURRENT_CHANNEL_SUCCESS,
  GET_CURRENT_CHANNEL_ERROR,
)<{ channelId: number }, CurrentChannelType, AxiosError>()

const actions = {
  getChannelsRequest: getChannels.request,
  getChannelsSuccess: getChannels.success,
  getChannelsError: getChannels.failure,
  createChannel,
  joinChannel,
  getCurrentChannelRequest: getCurrentChannel.request,
  getCurrentChannelSuccess: getCurrentChannel.success,
  getCurrentChannelError: getCurrentChannel.failure,
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
})

export default reducer
