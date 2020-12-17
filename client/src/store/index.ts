import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
    : applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof rootReducer>

export default store
