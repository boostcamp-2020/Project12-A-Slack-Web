import {
  createAction,
  ActionType,
  createReducer,
  createAsyncAction,
} from 'typesafe-actions'
import { AxiosError } from 'axios'
import { WorkspaceResponseType } from '@type/workspace.type'

export interface ChannelResponseType {
  id: number
  name: string
  type: 'PRIVATE' | 'PUBLIC' | 'DM'
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export interface ChannelState {
  channelList: ChannelResponseType[]
  workspaceInfo: WorkspaceResponseType | null
  loading: boolean
  error: AxiosError | null
}

export interface CreateChannelRequestType {
  name: string
  imageUrl: string
}

export interface JoinChannelRequestType {
  channelId: number
  userId: number
}

interface ChannelRequestType {
  workspaceId?: number
}

export const GET_CHANNELS = 'channel/GET_CHANNELS' as const
const GET_CHANNELS_SUCCESS = 'channel/GET_CHANNELS_SUCCESS' as const
const GET_CHANNELS_ERROR = 'channel/GET_CHANNELS_ERROR' as const

export const CREATE_CHANNEL = 'channel/CREATE_CHANNEL'
export const JOIN_CHANNEL = 'channel/JOIN_CHANNEL'

export const getChannels = createAction(GET_CHANNELS)<ChannelRequestType>()
export const getChannelsSuccess = createAction(GET_CHANNELS_SUCCESS)<
  ChannelResponseType[]
>()
export const getChannelsError = createAction(GET_CHANNELS_ERROR)<AxiosError>()
export const createChannel = createAction(CREATE_CHANNEL)<
  CreateChannelRequestType
>()
export const joinChannel = createAction(JOIN_CHANNEL)<JoinChannelRequestType>()

export const getChannelsAsync = createAsyncAction(
  GET_CHANNELS,
  GET_CHANNELS_SUCCESS,
  GET_CHANNELS_ERROR,
)<ChannelRequestType, ChannelResponseType[], AxiosError>()

const actions = {
  getChannels,
  getChannelsSuccess,
  getChannelsError,
  createChannel,
  joinChannel,
}

export type ChannelAction = ActionType<typeof actions>

const initialState: ChannelState = {
  channelList: [],
  workspaceInfo: null,
  loading: true,
  error: null,
}

const reducer = createReducer<ChannelState, ChannelAction>(initialState, {
  [GET_CHANNELS]: (state, action) => ({
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
})

export default reducer
