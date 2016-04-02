import React from 'react';
import WebUtil from '../util/web-util';

class ReplyDetail extends React.Component {
	constructor(props) {
		super(props);
	}

	_handleDelete(e) {
		e.preventDefault();

		WebUtil.destroyReply(this.props.reply.id);
	}

	render() {
		return (
			<div className="reply-detail">
				<p>{this.props.reply.body} <a href="#" onClick={this._handleDelete.bind(this)}>Delete Reply</a></p>
			</div>
		);
	}
}

export default ReplyDetail;
