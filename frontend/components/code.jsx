import React from 'react';
import ReactDOM from 'react-dom';
import ExplanationActions from '../actions/explanation-actions';
import ExplanationStore from '../stores/explanation';

import CodeMirror from 'react-codemirror';
import SimpleScrollBars from 'codemirror/addon/scroll/simplescrollbars';

import CMBrainfuck from 'codemirror/mode/brainfuck/brainfuck';
import CMCLike from 'codemirror/mode/clike/clike';
import CMCoffeeScript from 'codemirror/mode/coffeescript/coffeescript';
import CMCSS from 'codemirror/mode/css/css';
import CMHaskell from 'codemirror/mode/haskell/haskell';
import CMHTML from 'codemirror/mode/htmlmixed/htmlmixed';
import CMJavaScript from 'codemirror/mode/javascript/javascript';
import CMJSX from 'codemirror/mode/jsx/jsx';
import CMLua from 'codemirror/mode/lua/lua';
import CMMarkdown from 'codemirror/mode/markdown/markdown';
import CMPython from 'codemirror/mode/python/python';
import CMRuby from 'codemirror/mode/ruby/ruby';
import CMRust from 'codemirror/mode/rust/rust';
import CMScheme from 'codemirror/mode/scheme/scheme';
import CMSass from 'codemirror/mode/sass/sass';
import CMSQL from 'codemirror/mode/sql/sql';

let CODE_MAP = {
	'c': 'text/x-csrc',
	'c++': 'text/x-c++src',
	'objectivec': 'text/x-objectivec'
};

class Code extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
			body: this.props.body || ''
    };

		this.explanations = [];
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

	componentDidUpdate() {
		if (this.props.isEditing) return;

		this._unhighlightExplanations();
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

	_unhighlightExplanations() {
		if (this.refs.codemirror) {
			let codeMirror = this.refs.codemirror.getCodeMirror();
			codeMirror.getAllMarks().forEach(mark => mark.clear());
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

	_handleBodyUpdate(newBody) {
		this.setState({
			body: newBody
		});

		this.props.onChange && this.props.onChange(newBody);
	}

  render() {
    if (!this.props.file) return <div></div>;

		let theme = 'material';
		if (this.props.isEditing) {
			theme += '-editing';
		}
		let mode = this.props.language || 'javascript';
		// Special mapping for the mode
		if (CODE_MAP[mode]) {
			mode = CODE_MAP[mode];
		}
		let options = {
			mode: mode,
			readOnly: !this.props.isEditing,
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
