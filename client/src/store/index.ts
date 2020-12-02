import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import workspaceStore from './workspace.store'
import threadStore from './thread.store'

const rootReducer = combineReducers({ workspaceStore, threadStore })

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger)),
)

export default store
