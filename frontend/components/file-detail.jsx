import React from 'react';
import { Link } from 'react-router';
import FileStore from '../stores/file';
import WebUtil from '../util/web-util';
import ChangeStore from '../stores/change';
import ReplyStore from '../stores/reply';
import TextChangeList from './text-change-list';
import ReplyForm from './reply-form';
import ReplyDetail from './reply-detail';

class FileDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: FileStore.find(this.props.params.fileSlug),
			changes: null,
			replies: null
    };
  }

  componentDidMount() {
    this.fileToken = FileStore.addListener(() => {
      this.setState({ file: FileStore.find(this.props.params.fileSlug) });
    });
		this.changeToken = ChangeStore.addListener(() => {
			this.setState({ changes: ChangeStore.all() });
		});
		this.replyToken = ReplyStore.addListener(() => {
			this.setState({
				replies: ReplyStore.allSourceFileReplies()
			});
		})
    WebUtil.fetchSourceFile(
			this.props.params.slug,
			this.props.params.fileSlug, (file) => {
				WebUtil.fetchSourceFileReplies(file.id);
			});
  }

  componentWillUnmount() {
    this.fileToken.remove();
		this.changeToken.remove();
		this.replyToken.remove();
  }

  componentWillReceiveProps(newProps) {
		WebUtil.fetchSourceFile(
			this.props.params.slug,
			this.props.params.fileSlug, (file) => {
				WebUtil.fetchSourceFileReplies(file.id);
			});
		this.setState({
			changes: null,
			replies: null
		});
  }

  _handleDelete(e) {
    e.preventDefault();

    WebUtil.destroySourceFile(this.props.params.slug, this.state.file.slug);
    this.context.router.push('/projects/' + this.props.params.slug);
  }

	_handleContributions(e) {
		e.preventDefault();

		let params = this.props.params;
		WebUtil.fetchSourceFileChanges(params.slug, this.state.file.slug);
	}

	_handleReply(reply) {
		WebUtil.createSourceFileReply(this.state.file.id, reply);
	}

  render() {
    if (!this.state.file) return <div></div>;

    let editUrl = '/projects/' + this.props.params.slug +
      '/files/' + this.props.params.fileSlug + '/edit';

		let changes = '';
		if (this.state.changes) {
			changes = <TextChangeList changes={this.state.changes} />
		}

		let replies = '';
		if (this.state.replies) {
			replies = this.state.replies.map(reply => {
				return (
					<ReplyDetail key={'reply-' + reply.id} reply={reply} />
				);
			});
		}

    return (
      <div className="file-detail detail">
        <h1>{this.state.file.name}</h1>
        <Link to={editUrl}>Edit</Link>
        <a href="#" onClick={this._handleDelete.bind(this)}>Delete</a>
				<a href='#' onClick={this._handleContributions.bind(this)}>Contributions</a>
        <p>{this.state.file.body}</p>
				<ReplyForm onSubmit={this._handleReply.bind(this)} />
				{replies}
				{changes}
      </div>
    );
  }
}
FileDetail.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default FileDetail;
