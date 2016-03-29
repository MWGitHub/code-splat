import Dispatcher from '../dispatcher/dispatcher';
import UserConstants from '../constants/user-constants';

export default {
  retrieveLogin: function (user) {
    Dispatcher.dispatch({
      actionType: UserConstants.RECEIVE_LOGIN,
      user: user
    });
  }
};
