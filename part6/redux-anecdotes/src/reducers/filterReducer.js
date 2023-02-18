
const reducer = (state = '', action) => {
  switch(action.type) {
    case "UPDATE_FILTER":
      return action.filter
    default:
      return state
  }
}

export const updateFilter = (filterText) => {
  return {
    type: 'UPDATE_FILTER',
    filter: filterText
  }
}

export default reducer