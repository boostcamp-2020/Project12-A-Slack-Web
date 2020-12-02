import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import workspaceStore from './workspace.store'
import threadStore from './thread.store'

const rootReducer = combineReducers({ workspaceStore, threadStore })

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk, logger)),
)

export default store
