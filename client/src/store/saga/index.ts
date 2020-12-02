import { all } from 'redux-saga/effects'
import threadSaga from './thread.saga'

function* rootSaga() {
  yield all([threadSaga()])
}

export default rootSaga
