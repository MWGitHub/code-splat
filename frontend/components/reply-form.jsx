import React from 'react';
import SessionStore from '../stores/session';
import PermissionUtil from '../util/permission-util';
import Settings from '../constants/settings';

class ReplyForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			body: ''
		};
	}

	componentDidMount() {
		this.sessionToken = SessionStore.addListener(() => {
			this.setState({ body: '' });
		});
	}

	componentWillUnmount() {
		this.sessionToken.remove();
	}

	_handleBodyChange(e) {
		this.setState({ body: e.target.value });
	}

	_handleSubmit(e) {
		e.preventDefault();

		this.props.onSubmit({ body: this.state.body });

		this.setState({
			body: ''
		});

		e.target.reset();
	}

	render() {
		// No permission to create a reply.
		if (!PermissionUtil.hasPermission.reply.create()) {
			return <div></div>
		}

    let replyHelp = '';
    if (Settings.SHOW_REPLY_HELP) {
      replyHelp = (
        <a className="aside" href="#">How to add links and images</a>
      );
    }

		return (
			<div className="reply-form">
				<form className='form-light' onSubmit={this._handleSubmit.bind(this)}>
					<div className='form-group'>
						<textarea
							value={this.state.body}
							onChange={this._handleBodyChange.bind(this)}
							placeholder="Let people know your thoughts on this project"
							></textarea>
					</div>
					<div className='form-group'>
						<input className="button-light" type="submit" value="Post Reply" />
						{replyHelp}
					</div>
				</form>
			</div>
		);
	}
}

export default ReplyForm;
