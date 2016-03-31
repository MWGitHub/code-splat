import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import UserConstants from '../constants/user-constants';

let _user = null;

let SessionStore = new Store(Dispatcher);

function logIn(user) {
  if (user.id) {
    _user = user;
  } else {
    _user = null;
  }
}

SessionStore.isLoggedIn = function () {
  return !!_user;
};

SessionStore.getUser = function () {
  return _user;
};

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.RECEIVE_LOGIN:
      logIn(payload.user);
      SessionStore.__emitChange();
      break;
    case UserConstants.RECEIVE_LOGOUT:
      _user = null;
      SessionStore.__emitChange();
      break;
  }
}

export default SessionStore;
