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
  ChannelResponseType,
  CreateChannelRequestType,
  JoinChannelRequestType,
} from '@type/channel.type'

export interface ChannelState {
  channelList: ChannelResponseType[]
  workspaceInfo: WorkspaceResponseType | null
  loading: boolean
  error: AxiosError | null
}

const initialState: ChannelState = {
  channelList: [],
  workspaceInfo: null,
  loading: true,
  error: null,
}

export const GET_CHANNELS_REQUEST = 'channel/GET_CHANNELS_REQUEST' as const
const GET_CHANNELS_SUCCESS = 'channel/GET_CHANNELS_SUCCESS' as const
const GET_CHANNELS_ERROR = 'channel/GET_CHANNELS_ERROR' as const
export const CREATE_CHANNEL = 'channel/CREATE_CHANNEL' as const
export const JOIN_CHANNEL_REQUEST = 'channel/JOIN_CHANNEL_REQUEST' as const
const JOIN_CHANNEL_SUCCESS = 'channel/JOIN_CHANNEL_SUCCESS' as const
const JOIN_CHANNEL_ERROR = 'channel/JOIN_CHANNEL_ERROR' as const

export const getChannels = createAsyncAction(
  GET_CHANNELS_REQUEST,
  GET_CHANNELS_SUCCESS,
  GET_CHANNELS_ERROR,
)<ChannelRequestType, ChannelResponseType[], AxiosError>()
export const createChannel = createAction(CREATE_CHANNEL)<
  CreateChannelRequestType
>()
export const joinChannel = createAsyncAction(
  JOIN_CHANNEL_REQUEST,
  JOIN_CHANNEL_SUCCESS,
  JOIN_CHANNEL_ERROR,
)<JoinChannelRequestType, ChannelResponseType, AxiosError>()

const actions = {
  getChannelsRequest: getChannels.request,
  getChannelsSuccess: getChannels.success,
  getChannelsError: getChannels.failure,
  createChannel,
  joinChannel,
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
})

export default reducer
