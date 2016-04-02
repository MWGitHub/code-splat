import React from 'react';

class ReplyDetail extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="reply-detail">
				<p>{this.props.reply.body}</p>
			</div>
		);
	}
}

export default ReplyDetail;
