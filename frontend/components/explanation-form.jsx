import React from 'react';
import WebUtil from '../util/web-util';

class ExplanationForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			body: ''
		}
	}

	_handleChange(e) {
		e.preventDefault();

		this.setState({ body: e.target.value });
	}

	_handleSubmit(e) {
		e.preventDefault();

		WebUtil.createExplanation(this.props.sourceFileId, {
			body: this.state.body,
			fragment: this.props.fragment,
			fragment_start: this.props.start
		});

		this.setState({
			body: ''
		});

		e.target.reset();
	}

	render() {
		return (
			<form className="form" onSubmit={this._handleSubmit.bind(this)}>
				<p>{this.props.selectionStart}</p>
				<p>{this.props.fragment}</p>
				<div className="form-group">
					<label htmlFor="explanation-body">Explanation</label>
					<textarea
						id="explanation-body"
						onChange={this._handleChange.bind(this)}
						value={this.state.body}
					></textarea>
				</div>
				<div className="form-group">
					<input type="submit" value="Save" />
				</div>
			</form>
		);
	}
}

export default ExplanationForm;
