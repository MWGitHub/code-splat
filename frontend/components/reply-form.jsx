import React from 'react';

class ReplyForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			body: ''
		};
	}

	_handleBodyChange(e) {
		this.setState({ body: e.target.value });
	}

	_handleSubmit(e) {
		e.preventDefault();

		this.props.onSubmit({ body: this.state.body });

		this.setState({
			body: ''
		});

		e.target.reset();
	}

	render() {
		return (
			<form className='form' onSubmit={this._handleSubmit.bind(this)}>
				<h3>Add Reply</h3>
				<div className='form-group'>
					<input
						type="text"
						value={this.state.body}
						onChange={this._handleBodyChange.bind(this)} />
				</div>
				<div className='form-group'>
					<input type="submit" value="Add Reply" />
				</div>
			</form>
		);
	}
}

export default ReplyForm;
