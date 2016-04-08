import React from 'react';
import ReactDOM from 'react-dom';
import ExplanationActions from '../actions/explanation-actions';
import ExplanationStore from '../stores/explanation';

import CodeMirror from 'react-codemirror';
import SimpleScrollBars from 'codemirror/addon/scroll/simplescrollbars';

import Ruby from 'codemirror/mode/ruby/ruby';

class Code extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
			isEditing: false,
			body: '' + this.props.file.body
    };

		this.explanations = [];
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

	componentDidUpdate() {
		this._highlightExplanations();
		this._bindListeners();
	}

	_positionToIndex(line, index) {

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

	_selectAnnotation(e) {
		let codeMirror = this.refs.codemirror.getCodeMirror();

		let cursor = codeMirror.getCursor();
		let line = cursor.line;
		let index = cursor.ch;

		let explanation = this._getExplanationAtPoint(line, index);
		if (explanation) {
			let instance = ExplanationStore.find(explanation.id);
			ExplanationActions.selectExplanation({
				sourceFileId: this.props.file.id,
				fragment: instance.fragment,
				fragmentStart: instance.fragment_start,
				explanation: instance
			});
		}
	}

	_selectFree(e) {
		let codeMirrorDOM = ReactDOM.findDOMNode(this.refs.codemirror);
		let codeMirror = this.refs.codemirror.getCodeMirror();

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
					sourceFileId: this.props.file.id,
					fragment: fragment,
					start: startIndex,
					explanation: null
				});
			}
		}

		if (this.selectAnnotation) {
			codeMirrorDOM.removeEventListener('mouseup', this.selectAnnotation);
			codeMirrorDOM.removeEventListener('mousedown', this.selectAnnotation);
		}
		this.selectAnnotation = this._selectAnnotation.bind(this);
		codeMirrorDOM.addEventListener('mouseup', this.selectAnnotation);
		codeMirrorDOM.addEventListener('mousedown', this.selectAnnotation);
	}

	_bindListeners() {
		if (this.refs.codemirror) {
			let codeMirrorDOM = ReactDOM.findDOMNode(this.refs.codemirror);
			if (this.selectFree) {
				codeMirrorDOM.removeEventListener('mouseup', this.selectFree);
			}
			this.selectFree = this._selectFree.bind(this);
			codeMirrorDOM.addEventListener('mouseup', this.selectFree);
		}
	}

	_highlightExplanations() {
		this.explanations = [];
		if (this.refs.codemirror && this.props.explanations) {
			let codeMirror = this.refs.codemirror.getCodeMirror();
			let codeMirrorDOM = ReactDOM.findDOMNode(this.refs.codemirror);

			// Highlight annotations
			for (let i = 0; i < this.props.explanations.length; ++i) {
				let explanation = this.props.explanations[i];

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

    WebUtil.destroySourceFile(this.props.params.slug, this.props.file.slug);
    this.context.router.push('/projects/' + this.props.params.slug);
  }

	_handleContributions() {
		WebUtil.fetchSourceFileChanges(this.props.file.id);
	}

	_handleReply(reply) {
		WebUtil.createSourceFileReply(this.props.file.id, reply);
	}

	_handleBodyUpdate(newBody) {
		this.setState({
			body: newBody
		});
	}

	_handleFormCancel() {
		ExplanationActions.deselectExplanation();
	}

  render() {
    if (!this.props.file) return <div></div>;

		let theme = 'material';
		if (this.state.isEditing) {
			theme += '-editing';
		}
		let options = {
			mode: this.props.file.language,
			readOnly: !this.state.isEditing,
			theme: theme,
			tabSize: 2,
			scrollbarStyle: 'simple'
		};

		let codeMirror = (
			<CodeMirror ref="codemirror"
				value={this.state.body}
				onChange={this._handleBodyUpdate.bind(this)}
				options={options}
			/>
		);

    return (
			<div className="code">
				{codeMirror}
			</div>
    );
  }
}

export default Code;
