import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thread from './thread'

const rootReducer = combineReducers({
  thread,
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger)),
)

export default store
