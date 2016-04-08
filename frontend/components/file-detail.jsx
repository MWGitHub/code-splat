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
import CodeMirror from 'react-codemirror';
import SimpleScrollBars from 'codemirror/addon/scroll/simplescrollbars';
import ExplanationForm from './explanation-form';
import ExplanationStore from '../stores/explanation';
import ExplanationDetail from './explanation-detail';

import Ruby from 'codemirror/mode/ruby/ruby';

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
    this.fileToken = FileStore.addListener(this._handleFileChange.bind(this));
		this.changeToken = ChangeStore.addListener(() => {
			this.setState({ changes: ChangeStore.all() });
		});
		this.replyToken = ReplyStore.addListener(() => {
			this.setState({ replies: ReplyStore.allSourceFileReplies() });
		});
		this.explanationToken = ExplanationStore.addListener(this._handleExplanationChange.bind(this));

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
			isEditing: false
		});
  }

	_getExplanationAtPoint(line, index) {
		for (let i = 0; i < this.explanations.length; ++i) {
			let explanation = this.explanations[i];
			let isInLine = line >= explanation.startLine &&
				line <= explanation.endLine;
			let isInIndex = index >= explanation.startIndex &&
				index <= explanation.endIndex;

			if (isInLine && isInIndex) {
				return ExplanationStore.find(explanation.id);
			}
		}
		return null;
	}

	_isSelectionAnnotated(start, end) {
		for (let i = 0; i < this.explanations.length; ++i) {
			let explanation = this.explanations[i];
			let isOutLine = start.line > explanation.endLine ||
				end.line < explanation.startLine;
			let isOutIndex = start.ch > explanation.endIndex ||
				end.ch < explanation.startIndex;

			if (!(isOutLine || isOutIndex)) {
				return true
			}
		}
		return false;
	}

	_handleFileChange() {
		this.setState({	file: FileStore.find(this.props.params.fileSlug) });

		if (this.refs.codemirror) {
			let codeMirrorDOM = ReactDOM.findDOMNode(this.refs.codemirror);
			let codeMirror = this.refs.codemirror.getCodeMirror();
			codeMirrorDOM.addEventListener('mouseup', e => {
				// Add selecting text for annotation adding
				let fragment = codeMirror.getSelection();
				let start = codeMirror.getCursor('from');
				let end = codeMirror.getCursor('to');
				let startIndex = 0;
				for (let i = 0; i < start.line; ++i) {
					let line = codeMirror.getLine(i);
					// Make sure to add the chars for the new line
					startIndex += 1 + line.length;
				}
				startIndex += start.ch;

				if (!this._isSelectionAnnotated(start, end)) {
					if (fragment.length === 0) {
						ExplanationActions.deselectExplanation();
					} else {
						ExplanationActions.selectExplanation({
							sourceFileId: this.state.file.id,
							fragment: fragment,
							start: startIndex,
							explanation: null
						});
					}
				}

				// Add selecting existing annotations
				let selectAnnotation = (e) => {
					let cursor = codeMirror.getCursor();
					let line = cursor.line;
					let index = cursor.ch;

					let explanation = this._getExplanationAtPoint(line, index);
					if (explanation) {
						let instance = ExplanationStore.find(explanation.id);
						ExplanationActions.selectExplanation({
							sourceFileId: this.state.file.id,
							fragment: instance.fragment,
							fragmentStart: instance.fragment_start,
							explanation: instance
						});
					}
				}

				codeMirrorDOM.addEventListener('mouseup', selectAnnotation);
				codeMirrorDOM.addEventListener('mousedown', selectAnnotation);
			});
		}
	}

	_handleExplanationChange() {
		this.setState({	explanations: ExplanationStore.all() });

		this.explanations = [];
		if (this.refs.codemirror) {
			let codeMirror = this.refs.codemirror.getCodeMirror();
			let codeMirrorDOM = ReactDOM.findDOMNode(this.refs.codemirror);

			// Highlight annotations
			for (let i = 0; i < this.state.explanations.length; ++i) {
				let explanation = this.state.explanations[i];

				let index = 0;
				let startLine = 0;
				let startIndex = 0;
				// Find start line and index
				for (let j = 0; j < codeMirror.lineCount(); ++j) {
					let line = codeMirror.getLine(j);
					if (j !== 0) index += 1;
					index += line.length;
					if (index >= explanation.fragment_start) {
						startLine = j;
						startIndex = explanation.fragment_start - (index - line.length);
						break;
					}
				}

				index = 0;
				let endLine = 0;
				let endIndex = 0;
				// Find end line and index
				for (let j = 0; j < codeMirror.lineCount(); ++j) {
					let line = codeMirror.getLine(j);
					if (j !== 0) index += 1;
					index += line.length;
					if (index >= explanation.fragment_end) {
						endLine = j;
						endIndex = explanation.fragment_end - (index - line.length);
						break;
					}
				}

				codeMirror.markText(
					{
						line: startLine,
						ch: startIndex
					},
					{
						line: endLine,
						ch: endIndex
					},
					{
						className: 'annotated-text'
					}
				);
				this.explanations.push({
					id: explanation.id,
					startLine: startLine,
					startIndex: startIndex,
					endLine: endLine,
					endIndex: endIndex
				});
			}
		}
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

	_handleBodyUpdate(newBody) {
		this.state.file.body = newBody;
		this.setState({
			file: this.state.file
		});
	}

	_handleFormCancel() {
		ExplanationActions.deselectExplanation();
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
			readOnly: !this.state.isEditing,
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
					<ExplanationDetail />
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
