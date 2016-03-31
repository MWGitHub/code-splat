import React from 'react';
import UserUtil from '../util/user-util';
import SessionStore from '../stores/session';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  componentWillMount() {
    if (SessionStore.isLoggedIn()) this.context.router.push('/');
  }

  componentDidMount() {
    this.changeToken = SessionStore.addListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    this.changeToken.remove();
  }

  _onChange() {
    if (SessionStore.isLoggedIn()) {
      this.context.router.push('/');
    }
  }

  _handleSubmit(e) {
    e.preventDefault();

    UserUtil.login({
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
      <div className="modal">
        <h1 className="form-title">SIGN IN</h1>
        <a className="close-button" href="#" onClick={this.props.onClose}>
          <i className="fa fa-times"></i>
        </a>
        <a href="#" className="auth-button auth-facebook">
          <i className="fa fa-facebook-official"></i>Sign in with Facebook
        </a>
        <a href="#" className="auth-button auth-twitter">
          <i className="fa fa-twitter"></i>Sign in with Twitter
        </a>
        <a href="#" className="auth-button auth-google">
          <i className="fa fa-google-plus"></i>Sign in with Google
        </a>
        <form className="form sub-form"
          onSubmit={this._handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" value={this.state.username} id="username"
              onChange={this._handleUsernameChange.bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password <a className="form-link label-sub" href="#" tabIndex="10">(I forgot my password)</a></label>
            <input type="password" value={this.state.password} id="password"
              onChange={this._handlePasswordChange.bind(this)} />
          </div>
          <div className="form-group">
            <input type="submit" value="Login" />
          </div>
        </form>
        <p>Don't have an account? <a
          href="#"
          className="form-link"
          onClick={this.props.onSwitch}
          >Sign up here.</a></p>
      </div>
    );
  }
}
Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Login;
