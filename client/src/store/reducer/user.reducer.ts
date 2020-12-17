import { ActionType, createReducer, createAction } from 'typesafe-actions'
import { AxiosError } from 'axios'
import { UserType as User } from '@type/user.type'

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

export const INSERT_USER_INFO = 'user/INSERT_USER_INFO' as const
export const insertUserInfo = createAction(INSERT_USER_INFO)<User>()

const actions = { insertUserInfo }

export type UserAction = ActionType<typeof actions>

const reducer = createReducer<UserState, UserAction>(initialState, {
  [INSERT_USER_INFO]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    currentUser: action.payload,
  }),
})

export default reducer
