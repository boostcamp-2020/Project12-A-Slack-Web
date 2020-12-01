import { combineReducers } from 'redux'
import thread from './thread'

const rootReducer = combineReducers({
  thread,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
