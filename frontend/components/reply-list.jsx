import React from 'react';
import ReplyDetail from './reply-detail';

class ReplyList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (!this.props.replies || this.props.replies.length === 0) {
			return <div></div>
		}

		let replies = '';
		if (this.props.replies) {
			replies = this.props.replies.map(reply => {
				return (
					<ReplyDetail key={'reply-' + reply.id} reply={reply} />
				);
			});
		}

		return (
			<div className="reply-list">
				{replies}
			</div>
		)
	}
}

export default ReplyList;
