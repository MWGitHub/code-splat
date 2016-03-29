import React from 'react';
import UserUtil from '../util/user-util';
import UserStore from '../stores/user';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    this.changeToken = UserStore.addListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    this.changeToken.remove();
  }

  _onChange() {
    if (UserStore.isLoggedIn()) {
      this.context.router.push('/');
    }
  }

  _handleSubmit(e) {
    e.preventDefault();

    this.setState({
      username: '',
      password: ''
    });

    this._onChange();

    e.target.reset();
  }

  _handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  _handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>SIGN IN</h1>
        <form onSubmit={this._handleSubmit.bind(this)}>
          <div>
            <label>Username
              <input type="text" value={this.state.username}
                onChange={this._handleUsernameChange.bind(this)} />
            </label>
          </div>
          <div>
            <label>Password
              <input type="password" value={this.state.password}
                onChange={this._handlePasswordChange.bind(this)} />
            </label>
          </div>
          <div>
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    );
  }
}
Login.contextTypes = {
  router: function () {
    return React.PropTypes.func.isRequired;
  }
};

export default Login;
