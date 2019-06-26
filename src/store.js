import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import authReducer from 'reducers/auth'
import navigationReducer from 'reducers/navigation'

const createFullStore = () => {
  const reducer = combineReducers({
    auth: authReducer,
    navigation: navigationReducer
  })

  const preloadedState = window.__PRELOADED_STATE__
  delete window.__PRELOADED_STATE__

  const composeEnhancers = global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = global.window.store = createStore(
    reducer,
    preloadedState || {},
    composeEnhancers(
      applyMiddleware(
        thunk
      )
    )
  )

  return store
}

export default createFullStore
