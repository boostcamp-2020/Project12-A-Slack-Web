import { all, fork } from 'redux-saga/effects'
import socketSaga from './socket.saga'
import threadSaga from './thread.saga'
import workspaceSaga from './workspace.saga'
import channelSaga from './channel.saga'

function* rootSaga() {
  yield all([
    fork(socketSaga),
    fork(threadSaga),
    fork(workspaceSaga),
    fork(channelSaga),
  ])
}

export default rootSaga
