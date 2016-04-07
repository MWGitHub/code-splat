import React from 'react';
import ExplanationForm from './explanation-form';
import ContributorInfo from './contributor-info';

class ExplanationDetail extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isFormShown: false
		};
	}

	_handleEditClick() {
		this.setState({
			isFormShown: true
		});
	}

	_handleContributions() {

	}

	render() {
		let content = '';
		if (this.state.isFormShown) {
			content = (
				<ExplanationForm
					sourceFileId={this.props.explanation.source_file_id}
					body={this.props.explanation.body}
				/>
			);
		} else {
			content = (
				<div>
					<p>{this.props.explanation.body}</p>
					<button onClick={this._handleEditClick.bind(this)}>Edit</button>
				</div>
			)
		}

		return (
			<div className="explanation">
				<h3>ANNOTATION</h3>
				<ContributorInfo
					count={this.props.explanation.contributor_count}
					onClick={this._handleContributions}
				/>
				{content}
			</div>
		);
	}
}

export default ExplanationDetail;
