import { call, put, takeEvery, fork, all } from 'redux-saga/effects'
import UserAPI from '@api/user'
import { GetUserInfoResponseType } from '@type/user.type'
import {
  getUserInfoAsync,
  GET_USER_INFO_REQUEST,
} from '../reducer/user.reducer'

interface UserInfoResponseType {
  success: boolean
  data: GetUserInfoResponseType
}

function* getUserInfoSaga() {
  try {
    const { data: userInfo, success }: UserInfoResponseType = yield call(
      UserAPI.getUserInfo,
    )
    console.log(userInfo)
    if (success) yield put(getUserInfoAsync.success(userInfo))
  } catch (error) {
    yield put(getUserInfoAsync.failure(error))
  }
}

function* watchGetUserInfoSage() {
  yield takeEvery(GET_USER_INFO_REQUEST, getUserInfoSaga)
}

export default function* userSaga() {
  yield all([fork(watchGetUserInfoSage)])
}
