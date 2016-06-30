// Reducer with initial state
const initialState = {
  isOn: false,
  time: 0
}

// reducer
const timer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_TIMER':
      return {
        time: state.time,
        isOn: true,
        offset: action.offset,
      }
    case 'STOP_TIMER':
      return {
        isOn: false,
        time: state.time
      }
    case 'RESET_TIME':
      return {
        isOn: state.isOn,
        time: 0,
        offset: state.offset
      }
    case 'TICK':
      return {
        time: state.time + (action.time - state.offset),
        isOn: state.isOn,
        offset: action.time
      }
    default:
      return state
  }
}

export default timer
