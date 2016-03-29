import Dispatcher from '../dispatcher/dispatcher';
import UserConstants from '../constants/user-constants';

export default {
  receiveLogin: function (user) {
    Dispatcher.dispatch({
      actionType: UserConstants.RECEIVE_LOGIN,
      user: user
    });
  },

  receiveLogout: function () {
    Dispatcher.dispatch({
      actionType: UserConstants.RECEIVE_LOGOUT
    })
  }
};
