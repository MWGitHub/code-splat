import UserActions from '../actions/user-actions';

export default {
  createAccount: function (options) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url: '/api/users/',
        dataType: 'json',
        data: {
          user: options
        },
        success: function (data) {
          UserActions.receiveLogin(data);
          resolve(data);
        },
        error: function (error) {
          reject(error);
        }
      });
    });
  },

  login: function (options) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url: '/api/session/',
        dataType: 'json',
        data: {
          session: options
        },
        success: function (data) {
          UserActions.receiveLogin(data);
          resolve(data);
        },
        error: function (error) {
          reject(error);
        }
      });
    });
  },

  checkLogin: function () {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: '/api/session',
        dataType: 'json',
        success: function (data) {
          UserActions.receiveLogin(data);
          resolve(data);
        },
        error: function (error) {
          reject(error);
        }
      });
    });
  },

  logout: function () {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'DELETE',
        url: '/api/session/',
        dataType: 'json',
        success: function (data) {
          UserActions.receiveLogout();
          resolve(data)
        },
        error: function (error) {
          reject(error);
        }
      });
    });
  },

	loginAsGuest: function () {
    return this.login({
      username: 'demo',
      password: 'password'
    });
	}
};
