import React from 'react';
import { Link } from 'react-router';
import UserUtil from '../util/user-util';
import SessionStore from '../stores/session';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      isFormShown: false
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

    UserUtil.createAccount({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    });

    this.setState({
      username: '',
      password: '',
      email: ''
    });

    e.target.reset();
  }

  _handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  _handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  _handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  _toggleEmailForm(e) {
    e.preventDefault();

    this.setState({
      isFormShown: !this.state.isFormShown
    });
  }

  render() {
		let authClass = 'auth-form';
		let closeButton = '';
		let switchLink = (
			<Link to="/login" className="form-link"
				>Sign in here.
			</Link>
		);
		if (this.props.modal) {
			authClass = 'modal';
			closeButton = (
				<a className="close-button" href="#" onClick={this.props.onClose}>
          <i className="fa fa-times"></i>
        </a>
			);
			switchLink = (
				<a href="#" className="form-link"
					onClick={this.props.onSwitch}
          >Sign in here.
				</a>
			);
		}

    let form = '';
    if (this.state.isFormShown) {
      form = (
        <form className="form sub-form" onSubmit={this._handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" value={this.state.username} id="username"
              onChange={this._handleUsernameChange.bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" value={this.state.email} id="email"
              onChange={this._handleEmailChange.bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" value={this.state.password} id="password"
              onChange={this._handlePasswordChange.bind(this)} />
          </div>
          <div className="form-group description">
            <p>If an e-mail is provided an activation e-mail will be sent. Providing an e-mail allows for resetting forgotten passwords.</p>
          </div>
          <div className="form-group">
            <input className="button-full" type="submit" value="Create Account" />
          </div>
        </form>
      );
    }

    return (
      <div className={authClass}>
        {closeButton}
        <h1 className="form-title">SIGN UP</h1>
        <p className="form-sub-header">and show off your genius</p>
        <a href="/auth/facebook" className="auth-button auth-facebook">
          <i className="fa fa-facebook-official"></i>Sign up with Facebook
        </a>
        <a href="/auth/github" className="auth-button auth-github">
          <i className="fa fa-github"></i>Sign up with GitHub
        </a>
        <a href="/auth/google_oauth2" className="auth-button auth-google">
          <i className="fa fa-google-plus"></i>Sign up with Google
        </a>
        <a href="#" className="auth-button auth-email"
          onClick={this._toggleEmailForm.bind(this)}>
          <i className="fa fa-envelope"></i>Sign up with email
        </a>
        {form}
        <p>Already have an account? {switchLink}</p>
      </div>
    );
  }
}
Register.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Register;
