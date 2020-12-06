import { call, put, takeEvery, fork, all } from 'redux-saga/effects'
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
    //   TODO: data로 workspace id 가지고 와서 해당 워크스페이스로 접속하기
    const { success, data } = yield call(
      workspaceAPI.createWorkspace,
      action.payload,
    )
    if (success) toast.success('workspace를 생성했습니다.')
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
    if (success) toast.success('workspace에 참가했습니다.')
  } catch (error) {
    toast.error('Failed to join workspace')
  }
}

function* watchGetWorkspacesSaga() {
  yield takeEvery(GET_WORKSPACES_REQUEST, getWorkspacesSaga)
}

function* watchCreateWorkspaceSaga() {
  yield takeEvery(CREATE_WORKSPACE, createWorkspaceSaga)
}

function* watchJoinWorkspaceSaga() {
  yield takeEvery(JOIN_WORKSPACE, joinWorkspaceSaga)
}

export default function* workspaceSaga() {
  yield all([
    fork(watchGetWorkspacesSaga),
    fork(watchCreateWorkspaceSaga),
    fork(watchJoinWorkspaceSaga),
  ])
}
