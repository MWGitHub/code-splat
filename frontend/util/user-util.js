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
        UserActions.retrieveLogin(data);
      }
    });
  }
};
