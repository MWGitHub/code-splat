import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import UserConstants from '../constants/user-constants';

var _user = null;

var UserStore = new Store(Dispatcher);


UserStore.isLoggedIn = function () {
  return !!_user;
};

UserStore.getUser = function () {
  return _user;
};

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.RECEIVE_LOGIN:
      _user = payload.user;
      UserStore.__emitChange();
      break;
    case UserConstants.RECEIVE_LOGOUT:
      _user = null;
      UserStore.__emitChange();
      break;
  }
};

export default UserStore;
