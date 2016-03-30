import UserActions from '../actions/user-actions';

export default {
  createAccount: function (options) {
    $.ajax({
      type: 'POST',
      url: '/api/users/',
      dataType: 'json',
      data: {
        user: options
      },
      success: function (data) {
        UserActions.receiveLogin(data);
      }
    });
  },

  login: function (options) {
    $.ajax({
      type: 'POST',
      url: '/api/session/',
      dataType: 'json',
      data: {
        session: options
      },
      success: function (data) {
        UserActions.receiveLogin(data);
      }
    });
  },

  checkLogin: function (onComplete) {
    $.ajax({
      type: 'GET',
      url: '/api/session',
      dataType: 'json',
      success: function (data) {
        UserActions.receiveLogin(data);
        if (onComplete) onComplete(data);
      },
      error: function () {
        if (onComplete) onComplete();
      }
    });
  },

  logout: function () {
    $.ajax({
      type: 'DELETE',
      url: '/api/session/',
      dataType: 'json',
      success: function (data) {
        UserActions.receiveLogout();
      }
    });
  }
};
