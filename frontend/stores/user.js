import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import UserConstants from '../constants/user-constants';

var _users = {};

var UserStore = new Store(Dispatcher);

UserStore.__onDispatch = function (payload) {
};

export default UserStore;
