import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import ErrorConstants from '../constants/error-constants';

let _errors = {};

let ErrorStore = new Store(Dispatcher);

function receiveError(error) {
  _errors[error.id] = error;
}

function receiveErrors(errors) {
  for (let i = 0; i < errors.length; ++i) {
    receiveError(errors[i]);
  }
}

function removeError(id) {
  delete _errors[id];
}

function removeErrors(ids) {
  for (let i = 0; i < ids.length; ++i) {
    removeError(ids[i]);
  }
}

ErrorStore.find = function (id) {
  return _errors[id];
};

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ErrorConstants.RECEIVE_ERRORS:
      receiveErrors(payload.errors);
      ErrorStore.__emitChange();
      break;
    case ErrorConstants.RECEIVE_ERROR:
      receiveError(payload.error);
      ErrorStore.__emitChange();
      break;
    case ErrorConstants.REMOVE_ERRORS:
      removeErrors(payload.ids);
      ErrorStore.__emitChange();
      break;
    case ErrorConstants.REMOVE_ERROR:
      removeError(payload.id);
      ErrorStore.__emitChange();
      break;
  }
};

export default ErrorStore;
