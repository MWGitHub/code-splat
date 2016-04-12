const error = (state, action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return {
        id: action.id,
        text: action.text
      };
    default:
      return state;
  }
};

const errors = (state = {}, action) => {
  let obj = {};
  switch (action.type) {
    case 'ADD_ERROR':
      obj[action.id] = error(undefined, action);
      return Object.assign({}, state, obj);
    case 'REMOVE_ERROR':
      obj = Object.assign({}, state);
      delete obj[action.id];
      return obj;
    default:
      return state;
  }
};

export default errors;
