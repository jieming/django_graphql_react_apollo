const initialState = {
  user: {},
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_USER_DATA':
      return { user: action.user }
    default:
      return state
  }
}

export default rootReducer
