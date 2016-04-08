import React from 'react';

class ExplanationForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			body: this.props.body || ''
		}
	}

	_handleChange(e) {
		e.preventDefault();

		this.setState({ body: e.target.value });
	}

	_handleSubmit(e) {
		e.preventDefault();

		let data = {
			body: this.state.body
		};

		this.props.onSubmit(data);

		this.setState({
			body: ''
		});

		e.target.reset();
	}

	_handleCancel(e) {
		e.preventDefault();

		this.props.onCancel();
	}

	render() {
		return (
			<form className="form-light" onSubmit={this._handleSubmit.bind(this)}>
				<div className="form-group">
					<textarea
						id="explanation-body"
						onChange={this._handleChange.bind(this)}
						value={this.state.body}
						placeholder="Say something about the selected lines"
					></textarea>
				</div>
				<div className="form-group">
					<input className="button-light button-good" type="submit" value="Save" />
					<input className="button-light button-neutral" type="button" value="Cancel" onClick={this._handleCancel.bind(this)} />
				</div>
			</form>
		);
	}
}

export default ExplanationForm;
