const defaultState = {
  location: 'home'
}

export default (state = { ...defaultState }, action) => {
  switch (action.type) {
    case 'NAVIGATION_SET_LOCATION':
      return {
        ...state,
        location: action.payload.location
      }
    default:
      return state
  }
}
