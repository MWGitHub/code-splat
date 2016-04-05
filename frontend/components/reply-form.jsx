import React from 'react';
import SessionStore from '../stores/session';
import PermissionConstants from '../constants/permission-constants';
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
		if (!PermissionUtil.hasPermission(PermissionConstants.REPLY)) {
			return <div></div>;
		}

		return (
			<form className='form-light' onSubmit={this._handleSubmit.bind(this)}>
				<h3>Add Reply</h3>
				<div className='form-group'>
					<input
						type="text"
						value={this.state.body}
						onChange={this._handleBodyChange.bind(this)} />
				</div>
				<div className='form-group'>
					<input type="submit" value="Add Reply" />
				</div>
			</form>
		);
	}
}

export default ReplyForm;
