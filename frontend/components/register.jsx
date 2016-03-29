import React from 'react';
import UserUtil from '../util/user-util';
import UserStore from '../stores/user';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  componentWillMount() {
    if (UserStore.isLoggedIn()) this.context.router.push('/');
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

    UserUtil.createAccount({
      username: this.state.username,
      password: this.state.password
    });

    this.setState({
      username: '',
      password: ''
    });

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
        <h1>SIGN UP</h1>
        <p>and show off your genius</p>
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
            <input type="submit" value="Create Account" />
          </div>
        </form>
      </div>
    );
  }
}
Register.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Register;
