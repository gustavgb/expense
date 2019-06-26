const defaultState = {
  userId: null,
  form: {
    email: '',
    password: '',
    status: 'ready'
  }
}

export default (state = { ...defaultState }, action) => {
  switch (action.type) {
    case 'AUTH_RESTORE_LOGIN':
      return {
        ...state,
        userId: action.payload.user.uid
      }
    case 'AUTH_LOGOUT':
      return {
        ...state,
        userId: null
      }
    case 'AUTH_FORM_LOADING':
      return {
        ...state,
        form: {
          ...state.form,
          status: 'loading'
        }
      }
    case 'AUTH_FORM_FAILED':
      return {
        ...state,
        form: {
          ...state.form,
          status: 'failed',
          password: ''
        }
      }
    case 'AUTH_FORM_SUCCEED':
      return {
        ...state,
        form: {
          ...defaultState.form,
          status: 'success'
        },
        userId: action.payload.user.uid
      }
    case 'AUTH_FORM_SET_EMAIL':
      return {
        ...state,
        form: {
          ...state.form,
          email: action.payload.email
        }
      }
    case 'AUTH_FORM_SET_PASSWORD':
      return {
        ...state,
        form: {
          ...state.form,
          password: action.payload.password
        }
      }
    case 'AUTH_FORM_RESET':
      return {
        ...state,
        form: {
          ...defaultState.form
        }
      }
    default:
      return state
  }
}
