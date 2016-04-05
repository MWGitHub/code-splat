import React from 'react';
import SessionStore from '../stores/session';
import PermissionUtil from '../util/permission-util';

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
						<input type="submit" value="Post Reply" />
						<a className="aside" href="#">How to add links and images</a>
					</div>
				</form>
			</div>
		);
	}
}

export default ReplyForm;
