import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import workspaceStore from './workspace.store'
import threadStore from './thread.store'
import rootSaga from './saga'

const rootReducer = combineReducers({ workspaceStore, threadStore })

const sagaMiddleware = createSagaMiddleware()

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger)),
)

sagaMiddleware.run(rootSaga)

export default store
