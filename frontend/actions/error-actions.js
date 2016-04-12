import Dispatcher from '../dispatcher/dispatcher';

export default {
  receiveErrors: function(errors) {
    return new Promise((resolve, reject) => {
      Dispatcher.dispatch({
        actionType: 'RECEIVE_ERRORS',
        errors: errors
      });
      resolve();
    });
  },

  receiveError: function(error) {
    return new Promise((resolve, reject) => {
      Dispatcher.dispatch({
        actionType: 'RECEIVE_ERROR',
        error: error
      });
      resolve();
    });
  },

  removeErrors: function(ids) {
    return new Promise((resolve, reject) => {
      Dispatcher.dispatch({
        actionType: 'REMOVE_ERRORS',
        ids: ids
      });
      resolve();
    });
  },

  removeError: function(id) {
    return new Promise((resolve, reject) => {
      Dispatcher.dispatch({
        actionType: 'REMOVE_ERROR',
        id: id
      });
      resolve();
    });
  }
};
