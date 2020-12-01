import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import reducers from './reducer'

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(logger)),
)

export default store
