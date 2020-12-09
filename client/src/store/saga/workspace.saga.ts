import { call, put, takeLatest, fork, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import workspaceAPI from '@api/workspace'
import {
  GET_WORKSPACES_REQUEST,
  CREATE_WORKSPACE,
  JOIN_WORKSPACE,
  getWorkspace,
  createWorkspace,
  joinWorkspace,
} from '../reducer/workspace.reducer'

function* getWorkspacesSaga() {
  try {
    const { success, data } = yield call(workspaceAPI.getWorkspace)
    if (success) console.log('workspace를 불러왔습니다.')
    yield put(getWorkspace.success(data))
  } catch (error) {
    toast.error('Failed to read workspace')
    yield put(getWorkspace.failure(error))
  }
}

function* createWorkspaceSaga(action: ReturnType<typeof createWorkspace>) {
  try {
    const { success } = yield call(workspaceAPI.createWorkspace, action.payload)
    if (success) {
      toast.success('workspace를 생성했습니다.')
      // TODO: 필요한 경우 redux-middleware에서 사용하는 custom history를 사용하자
      window.location.href = '/'
    }
  } catch (error) {
    toast.error('Failed to create workspace')
  }
}

function* joinWorkspaceSaga(action: ReturnType<typeof joinWorkspace>) {
  try {
    const { success, data } = yield call(
      workspaceAPI.joinWorkspace,
      action.payload,
    )
    if (success) {
      toast.success('workspace에 참가했습니다.')
    }
  } catch (error) {
    toast.error('Failed to join workspace')
  }
}

function* watchGetWorkspacesSaga() {
  yield takeLatest(GET_WORKSPACES_REQUEST, getWorkspacesSaga)
}

function* watchCreateWorkspaceSaga() {
  yield takeLatest(CREATE_WORKSPACE, createWorkspaceSaga)
}

function* watchJoinWorkspaceSaga() {
  yield takeLatest(JOIN_WORKSPACE, joinWorkspaceSaga)
}

export default function* workspaceSaga() {
  yield all([
    fork(watchGetWorkspacesSaga),
    fork(watchCreateWorkspaceSaga),
    fork(watchJoinWorkspaceSaga),
  ])
}
