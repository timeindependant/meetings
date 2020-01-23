import { put, takeEvery, takeLatest } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'
import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERROR,
  LOGIN_LINK_LOADING, LOGIN_LINK_SUCCESS, LOGIN_LINK_ERROR,
  LOGOUT_ERROR, LOGOUT_LOADING } from './actions'

import { fetchAsync } from '../helpers'

const AUTH_API_URL = 'https://auth.serv.timz.io/auth/graphql'

function * login (action) {
  try {
    if (action.token) {
      yield fetchAsync(
        () => fetch(
          AUTH_API_URL,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${action.token}`
            },
            body: JSON.stringify({ query: `{ verifyToken() { message }}` })
          }
        ))

      const decoded = jwtDecode(action.token)
      localStorage.setItem('token', action.token)
      yield put({ type: LOGIN_SUCCESS, name: decoded.name, role: decoded.role, id: decoded.id })
    } else {
      const token = localStorage.getItem('token')

      if (!token) {
        throw Error('No Token found.')
      }

      yield fetchAsync(
        () => fetch(
          AUTH_API_URL,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ query: `{ verifyToken() { message }}` })
          }
        ))

      const decoded = jwtDecode(action.token)
      localStorage.setItem('token', action.token)
      yield put({ type: LOGIN_SUCCESS, name: decoded.name, role: decoded.role, id: decoded.id })
    }
  } catch (e) {
    if (!action.token) {
      yield put({ type: LOGIN_ERROR, error: e.message })
    } else {
      yield put({ type: LOGIN_ERROR, error: e.message, token: true })
    }
  }
}

export function * loginSaga () {
  yield takeEvery(LOGIN_LOADING, login)
}

function * getLoginLink (action) {
  try {
    yield fetchAsync(
      () => fetch(
        AUTH_API_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ mutation: `{ login(email: ${action.email}) { message }}` })
        }
      ))
    yield put({ type: LOGIN_LINK_SUCCESS })
  } catch (e) {
    yield put({ type: LOGIN_LINK_ERROR, message: e.message })
  }
}

export function * loginLinkSaga () {
  yield takeLatest(LOGIN_LINK_LOADING, getLoginLink)
}

function * logout () {
  try {
    yield fetchAsync(
      () => fetch(
        AUTH_API_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ mutation: `{ logout() { message }}` })
        }
      ))
    localStorage.removeItem('token')
    location.reload()
  } catch (e) {
    yield put({ type: LOGOUT_ERROR, message: e.message })
  }
}

export function * logoutSaga () {
  yield takeLatest(LOGOUT_LOADING, logout)
}
