import { ActionType, createReducer, createAsyncAction } from 'typesafe-actions'
import { AxiosError } from 'axios'
import { UserType as User, GetUserInfoResponseType } from '@type/user.type'

export interface UserState {
  currentUser: User
  loading: boolean
  error: AxiosError | null
}

const initialState: UserState = {
  currentUser: {
    id: -1,
    email: '',
    name: '',
    profileImageUrl: '',
  },
  loading: true,
  error: null,
}

export const GET_USER_INFO_REQUEST = 'user/GET_USER_INFO_REQUEST' as const
const GET_USER_INFO_SUCCESS = 'user/GET_USER_INFO_SUCCESS' as const
const GET_USER_INFO_ERROR = 'user/GET_USER_INFO_ERROR' as const

export const getUserInfoAsync = createAsyncAction(
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
)<undefined, GetUserInfoResponseType, AxiosError>()

const actions = {
  getUserInfoRequest: getUserInfoAsync.request,
  getUserInfoSuccess: getUserInfoAsync.success,
  getUserInfoFailure: getUserInfoAsync.failure,
}

export type UserAction = ActionType<typeof actions>

const reducer = createReducer<UserState, UserAction>(initialState, {
  [GET_USER_INFO_REQUEST]: (state, _) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [GET_USER_INFO_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    currentUser: action.payload,
  }),
  [GET_USER_INFO_ERROR]: (state, action) => ({
    ...state,
    currentUser: state.currentUser,
    error: action.payload,
  }),
})

export default reducer
