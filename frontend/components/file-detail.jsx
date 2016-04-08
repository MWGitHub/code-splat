import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import FileStore from '../stores/file';
import WebUtil from '../util/web-util';
import ExplanationUtil from '../util/explanation-util';
import ExplanationActions from '../actions/explanation-actions';
import ChangeStore from '../stores/change';
import ReplyStore from '../stores/reply';
import TextChangeList from './text-change-list';
import ReplyForm from './reply-form';
import ReplyDetail from './reply-detail';
import ExplanationForm from './explanation-form';
import ExplanationStore from '../stores/explanation';
import ExplanationDetail from './explanation-detail';
import ContributorInfo from './contributor-info';
import Code from './code';
import ExplanationSelectionStore from '../stores/explanation-selection';
import DOMUtil from '../util/dom-util';
import ReplyList from './reply-list';

class FileDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: FileStore.find(this.props.params.fileSlug),
			explanations: null,
			changes: null,
			replies: null,
			isEditing: false
    };

		this.explanations = [];
  }

  componentDidMount() {
    this.fileToken = FileStore.addListener(() => {
			this.setState({	file: FileStore.find(this.props.params.fileSlug) });
		});
		this.changeToken = ChangeStore.addListener(() => {
			this.setState({ changes: ChangeStore.all() });
		});
		this.replyToken = ReplyStore.addListener(() => {
			this.setState({ replies: ReplyStore.allSourceFileReplies() });
		});
		this.explanationToken = ExplanationStore.addListener(() => {
			this.setState({	explanations: ExplanationStore.all() });
		});
		this.selectionToken = ExplanationSelectionStore.addListener(this._handleExplanationSelecting.bind(this));

		WebUtil.fetchSourceFile(
			this.props.params.slug,
			this.props.params.fileSlug, file => {
				WebUtil.fetchSourceFileReplies(file.id, replies => {
					ExplanationUtil.fetchExplanations(file.id, explanations => {
						ExplanationActions.deselectExplanation();
					});
				});
			}
		);
  }

  componentWillUnmount() {
    this.fileToken.remove();
		this.changeToken.remove();
		this.replyToken.remove();
		this.explanationToken.remove();
		this.selectionToken.remove();
  }

  componentWillReceiveProps(newProps) {
		WebUtil.fetchSourceFile(
			this.props.params.slug,
			this.props.params.fileSlug, file => {
				WebUtil.fetchSourceFileReplies(file.id, replies => {
					WebUtil.fetchExplanations(file.id);
				});
			});
		this.setState({
			changes: null,
			replies: null,
			explanations: null,
			isEditing: false,
			isSelecting: false
		});
  }

  _handleDelete(e) {
    e.preventDefault();

    WebUtil.destroySourceFile(this.props.params.slug, this.state.file.slug);
    this.context.router.push('/projects/' + this.props.params.slug);
  }

	_handleContributions() {
		WebUtil.fetchSourceFileChanges(this.state.file.id);
	}

	_handleReply(reply) {
		WebUtil.createSourceFileReply(this.state.file.id, reply);
	}

	_handleFormCancel() {
		ExplanationActions.deselectExplanation();
	}

	_handleExplanationSelecting() {
		if (ExplanationSelectionStore.isSelecting()) {
			if (!ExplanationSelectionStore.getSelectionCoords()) return;

			let node = ReactDOM.findDOMNode(this.refs.explanationContainer);
			let anchor = ReactDOM.findDOMNode(this.refs.explanationAnchor);
			if (node && anchor) {
				let top = document.documentElement.scrollTop || document.body.scrollTop;
				let selectTop = ExplanationSelectionStore.getSelectionCoords().top;
				let anchorStart = top + anchor.getBoundingClientRect().top;
				let result = selectTop - anchorStart;
				if (result < 0) result = 0;
				node.style.top = result + 'px';
			}
		}
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
			replies = (
				<div className="section replies">
					<h3 className="section-header">Replies</h3>
					<ReplyList replies={this.state.replies} />
				</div>
			);
			// replies = this.state.replies.map(reply => {
			// 	return (
			// 		<ReplyDetail key={'reply-' + reply.id} reply={reply} />
			// 	);
			// });
		}

    return (
      <div className="file-detail detail group">
				<div className="full">
					<div className="title group">
						<h1 className="title-main">{this.state.file.name}</h1>
						<span className="title-aside">in <Link to={"/projects/" + this.state.file.project_slug}>{this.state.file.project_title}</Link></span>
					</div>
				</div>
				<div className="left">
					<div className="code">
						<Code
							file={this.state.file}
							body={this.state.file.body}
							language={this.state.file.language}
							explanations={this.state.explanations}
						/>
					</div>
					<div className="reply-group">
						<ReplyForm onSubmit={this._handleReply.bind(this)} />
						{replies}
					</div>
				</div>
				<div className="right">
					<ContributorInfo
						count={this.state.file.contributor_count}
						onClick={this._handleContributions.bind(this)}
					/>
					<div className="description-group">
						<span className="description-title">Language:</span>
						<span className="description-text">{this.state.file.language}</span>
					</div>
					<div className="detail-actions group">
						<Link to={editUrl}>Edit File</Link>
						<a href="#" onClick={this._handleDelete.bind(this)}>Delete File</a>
					</div>
					<div ref="explanationAnchor" className="explanation-anchor">
						<div ref="explanationContainer" className="explanation-position">
							<ExplanationDetail />
						</div>
					</div>
				</div>
				{changes}
      </div>
    );
  }
}
FileDetail.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default FileDetail;
