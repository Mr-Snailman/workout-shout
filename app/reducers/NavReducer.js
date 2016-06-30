// reducer
const nav = (state = 1, action) => {
  switch (action.type) {
    case 'CHANGE_TAB':
      return action.tab
    default:
      return state
  }
}

export default nav 
