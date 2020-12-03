import { all } from 'redux-saga/effects'
import threadSaga from './thread.saga'
import workspaceSaga from './workspace.saga'

function* rootSaga() {
  yield all([threadSaga(), workspaceSaga()])
}

export default rootSaga
