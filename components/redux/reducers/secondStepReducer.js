const initialState = {
  spaceData: [],
}

const secondStepReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SPACE_DATA':
      return {
        ...state,
        spaceData: action.payload,
      }
    default:
      return state
  }
}

export default secondStepReducer
