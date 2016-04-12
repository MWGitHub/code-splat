import React from 'react';
import { Link } from 'react-router';
import UserUtil from '../util/user-util';
import SessionStore from '../stores/session';
import FormField from './form-field';
import co from 'co';
import ErrorActions from '../actions/error-actions';

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
    ErrorActions.removeErrors([
      'register-username',
      'register-password',
      'register-email'
    ]);
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

    var that = this;
    co(function* () {
      yield ErrorActions.removeErrors(
        ['register-username', 'register-password', 'register-email']
      );

      yield UserUtil.createAccount({
        username: that.state.username,
        password: that.state.password,
        email: that.state.email
      });
    }).catch(e => {
      let json = e.responseJSON;
      let errors = [];
      if (json.username) {
        errors.push({
          id: 'register-username',
          text: json.username[json.username.length - 1]
        });
      }
      if (json.password_digest) {
        errors.push({
          id: 'register-password',
          text: json.password_digest[json.password_digest.length - 1]
        });
      }
      if (json.email) {
        errors.push({
          id: 'register-email',
          text: json.email[json.email.length - 1]
        });
      }
      console.log(errors);
      ErrorActions.receiveErrors(errors);
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
            <FormField
              id="username"
              errorId="register-username"
              label="Username">
              <input type="text" value={this.state.username} id="username"
                onChange={this._handleUsernameChange.bind(this)} />
            </FormField>
          </div>
          <div className="form-group">
            <FormField
              id="email"
              errorId="register-email"
              label="Email"
            >
            <input type="email" value={this.state.email} id="email"
              onChange={this._handleEmailChange.bind(this)} />
            </FormField>
          </div>
          <div className="form-group">
            <FormField
              id="password"
              errorId="register-password"
              label="Password"
            >
            <input type="password" value={this.state.password} id="password"
              onChange={this._handlePasswordChange.bind(this)} />
            </FormField>
          </div>
          <div className="form-group description">
            <p>Providing an email allows you to reset forgotten passwords.</p>
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
        <p className="form-description">Already have an account? {switchLink}</p>
      </div>
    );
  }
}
Register.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Register;
