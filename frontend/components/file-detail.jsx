import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import FileStore from '../stores/file';
import WebUtil from '../util/web-util';
import ChangeStore from '../stores/change';
import ReplyStore from '../stores/reply';
import TextChangeList from './text-change-list';
import ReplyForm from './reply-form';
import ReplyDetail from './reply-detail';
import CodeMirror from 'react-codemirror';
import Ruby from 'codemirror/mode/ruby/ruby';
import SimpleScrollBars from 'codemirror/addon/scroll/simplescrollbars';
import ExplanationForm from './explanation-form';

class FileDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: FileStore.find(this.props.params.fileSlug),
			changes: null,
			replies: null,
			isEditing: false,
			selection: null,
			selectionStart: null
    };
  }

  componentDidMount() {
    this.fileToken = FileStore.addListener(this._handleFilechange.bind(this));
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
			}
		);
  }

  componentWillUnmount() {
    this.fileToken.remove();
		this.changeToken.remove();
		this.replyToken.remove();
		clearInterval(this.selectionInterval);
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

	_handleFilechange() {
	  this.setState({ file: FileStore.find(this.props.params.fileSlug) });

		if (this.refs.codemirror) {
			let codeMirrorDOM = ReactDOM.findDOMNode(this.refs.codemirror);
			codeMirrorDOM.addEventListener('mouseup', e => {
				let codeMirror = this.refs.codemirror.getCodeMirror();
				let selection = codeMirror.getSelection();
				let start = codeMirror.getCursor('from');
				let startIndex = 0;
				for (let i = 0; i < start.line; ++i) {
					let line = codeMirror.getLine(i);
					// Make sure to add the chars for the new line
					startIndex += 1 + line.length;
				}
				startIndex += start.ch;
				this.setState({
					selectionStart: startIndex,
					selection: selection
				});
			});
		}
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

	_handleBodyUpdate(newBody) {
		this.state.file.body = newBody;
		this.setState({
			file: this.state.file
		});
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

		let theme = 'material';
		if (this.state.isEditing) {
			theme += '-editing';
		}
		let options = {
			mode: this.state.file.language,
			readOnly: !!this.state.isEditing,
			theme: theme,
			tabSize: 2,
			scrollbarStyle: 'simple'
		};

		let codeMirror = (
			<CodeMirror ref="codemirror"
				value={this.state.file.body} 	onChange={this._handleBodyUpdate.bind(this)}
				options={options}
			/>
		);

		let explanationForm = '';
		if (this.state.selection && this.state.selectionStart) {
			explanationForm = (
				<ExplanationForm
					start={this.state.selectionStart}
					fragment={this.state.selection}
					sourceFileId={this.state.file.id}
				/>
			);
		}

    return (
      <div className="file-detail detail group">
				<div className="full">
					<h1>{this.state.file.name}</h1>
				</div>
				<div className="left">
					<div className="code">
						{codeMirror}
					</div>
					<ReplyForm onSubmit={this._handleReply.bind(this)} />
					{replies}
				</div>
				<div className="right">
					<Link to={editUrl}>Edit</Link>
					<a href="#" onClick={this._handleDelete.bind(this)}>Delete</a>
					<a href='#' onClick={this._handleContributions.bind(this)}>Contributions</a>
					{explanationForm}
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
