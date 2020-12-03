import { call, put, takeEvery } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import workspaceAPI from '@api/workspace'
import {
  getWorkspaceAsync,
  createWorkspace,
  GET_WORKSPACES,
  CREATE_WORKSPACE,
  JOIN_WORKSPACE,
  joinWorkspace,
} from '../reducer/workspace.reducer'

function* getWorkspaceSaga() {
  try {
    const { success, data } = yield call(workspaceAPI.getWorkspace)
    if (success) console.log('workspace를 불러왔습니다.')
    yield put(getWorkspaceAsync.success(data))
  } catch (error) {
    toast.error('Failed to read workspace')
    yield put(getWorkspaceAsync.failure(error))
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

export default function* workspaceSaga() {
  yield takeEvery(GET_WORKSPACES, getWorkspaceSaga)
  yield takeEvery(CREATE_WORKSPACE, createWorkspaceSaga)
  yield takeEvery(JOIN_WORKSPACE, joinWorkspaceSaga)
}
