import React from 'react';
import WebUtil from '../util/web-util';
import PermissionUtil from '../util/permission-util';

class ReplyDetail extends React.Component {
	constructor(props) {
		super(props);
	}

	_handleDelete(e) {
		e.preventDefault();

		WebUtil.destroyReply(this.props.reply.id);
	}

	render() {
		let deleteButton = '';
		if (PermissionUtil.hasPermission.reply.destroy()) {
			deleteButton = (
				<p>
					<a href="#" onClick={this._handleDelete.bind(this)}>Delete Reply</a>
				</p>
			);
		}

		return (
			<div className="reply-detail">
				<p>{this.props.reply.username} says:</p>
				<p>{this.props.reply.body}</p>
				{deleteButton}
			</div>
		);
	}
}

export default ReplyDetail;
