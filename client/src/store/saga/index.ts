import { all } from 'redux-saga/effects'
import threadSaga from './thread.saga'
import workspaceSaga from './workspace.saga'
import channelSaga from './channel.saga'

function* rootSaga() {
  yield all([threadSaga(), workspaceSaga(), channelSaga()])
}

export default rootSaga
