/* globals firebase */

import { navigateTo } from 'actions/navigation'

export const restoreLogin = (user) => ({
  type: 'AUTH_RESTORE_LOGIN',
  payload: {
    user
  }
})

export const login = () => (dispatch, getState) => {
  const { email, password } = getState().auth.form

  dispatch({
    type: 'AUTH_FORM_LOADING'
  })

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      dispatch({
        type: 'AUTH_FORM_SUCCEED',
        payload: {
          user
        }
      })

      dispatch(navigateTo('home'))
    })
    .catch(error => {
      console.error(error)

      dispatch({
        type: 'AUTH_FORM_FAILED'
      })
    })
}

export const register = () => (dispatch, getState) => {
  const { email, password } = getState().auth.form

  dispatch({
    type: 'AUTH_FORM_LOADING'
  })

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      dispatch({
        type: 'AUTH_FORM_SUCCEED',
        payload: {
          user
        }
      })

      dispatch(navigateTo('home'))
    })
    .catch(error => {
      console.error(error)

      dispatch({
        type: 'AUTH_FORM_FAILED'
      })
    })
}

export const resetAuthForm = () => ({
  type: 'AUTH_FORM_RESET'
})

export const setEmail = (email) => ({
  type: 'AUTH_FORM_SET_EMAIL',
  payload: {
    email
  }
})

export const setPassword = (password) => ({
  type: 'AUTH_FORM_SET_PASSWORD',
  payload: {
    password
  }
})
