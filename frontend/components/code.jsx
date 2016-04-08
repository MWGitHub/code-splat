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

	_positionToIndex(line, ch) {
		let codeMirror = this.refs.codemirror.getCodeMirror();

		// Add selecting text for annotation adding
		let index = 0;
		for (let i = 0; i < line; ++i) {
			let codeLine = codeMirror.getLine(i);
			// Make sure to add the chars for the new line
			index += 1 + codeLine.length;
		}
		index += ch;

		return index;
	}

	_indexToPosition(index) {
		let codeMirror = this.refs.codemirror.getCodeMirror();

		let countIndex = 0;
		let line = 0;
		let ch = 0;
		// Find start line and ch
		for (let i = 0; i < codeMirror.lineCount(); ++i) {
			let codeLine = codeMirror.getLine(i);
			if (i !== 0) countIndex += 1;
			countIndex += codeLine.length;
			if (countIndex >= index) {
				line = i;
				ch = index - (countIndex - codeLine.length);
				break;
			}
		}
		return {
			line: line,
			ch: ch
		};
	}

	_getExplanationAtPoint(line, ch) {
		let index = this._positionToIndex(line, ch);
		for (let i = 0; i < this.explanations.length; ++i) {
			let explanation = this.explanations[i];
			let isIn = index >= explanation.startIndex && index <= explanation.endIndex;

			if (isIn) {
				return ExplanationStore.find(explanation.id);
			}
		}
		return null;
	}

	_isSelectionAnnotated(start, end) {
		let startIndex = this._positionToIndex(start.line, start.ch);
		let endIndex = this._positionToIndex(end.line, end.ch);

		for (let i = 0; i < this.explanations.length; ++i) {
			let explanation = this.explanations[i];
			let isOut = startIndex > explanation.endIndex || endIndex < explanation.startIndex;

			if (!isOut) {
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
		let startIndex = this._positionToIndex(start.line, start.ch);

		if (!this._isSelectionAnnotated(start, end)) {
			if (fragment.trim().length === 0) {
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

				let start = this._indexToPosition(explanation.fragment_start);
				let end = this._indexToPosition(explanation.fragment_end);

				codeMirror.markText(start, end,
					{
						className: 'annotated-text'
					}
				);
				this.explanations.push({
					id: explanation.id,
					start: start,
					end: end,
					startIndex: explanation.fragment_start,
					endIndex: explanation.fragment_end,
					explanation: explanation
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
