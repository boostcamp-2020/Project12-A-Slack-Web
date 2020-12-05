import { all, fork } from 'redux-saga/effects'
import threadSaga from './thread.saga'
import workspaceSaga from './workspace.saga'
import channelSaga from './channel.saga'

function* rootSaga() {
  yield all([fork(threadSaga), fork(workspaceSaga), fork(channelSaga)])
}

export default rootSaga
