import React from 'react';
import ExplanationForm from './explanation-form';
import ContributorInfo from './contributor-info';
import ExplanationUtil from '../util/explanation-util';
import ExplanationActions from '../actions/explanation-actions';
import ExplanationSelectionStore from '../stores/explanation-selection';
import PermissionUtil from '../util/permission-util';

class ExplanationEmpty extends React.Component {
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

	_handleFormCancel() {
		this.setState({
			isFormShown: false
		});
		ExplanationActions.deselectExplanation();
	}

	_handleExplanationSubmit(data) {
		data.fragment = this.props.fragment;
		data.fragment_start = this.props.start;
		ExplanationUtil.createExplanation(this.props.sourceFileId, data, explanation => {
			ExplanationActions.selectExplanation({
				sourceFileId: explanation.source_file_id,
				fragment: explanation.fragment,
				start: explanation.fragment_start,
				explanation: explanation
			});
		});
	}

	render() {
		let content = '';
		if (this.state.isFormShown) {
			content = (
				<ExplanationForm
					onCancel={this._handleFormCancel.bind(this)}
					onSubmit={this._handleExplanationSubmit.bind(this)}
				/>
			);
		} else {
			content = (
				<div className="form-group">
					<button className="button-light"
						onClick={this._handleEditClick.bind(this)}>
						Start the Annotation
					</button>
				</div>
			);
		}

		return (
			<div className="explanation">
				{content}
			</div>
		);
	}
}

class ExplanationProvided extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isFormShown: false
		};
	}

	componentDidMount() {
		this.explanationSelectionToken = ExplanationSelectionStore.addListener(this._handleExplanationSelectionChange.bind(this));
	}

	componentWillUnmount() {
		this.explanationSelectionToken.remove();
	}

	_handleExplanationSelectionChange() {
		this.setState({
			isFormShown: false
		});
	}

	_handleEditClick() {
		this.setState({
			isFormShown: true
		});
	}

	_handleFormCancel() {
		this.setState({
			isFormShown: false
		});
	}

	_handleExplanationSubmit(data) {
		data.fragment = this.props.fragment;
		data.fragment_start = this.props.start;
		ExplanationUtil.updateExplanation(this.props.explanation.id, data, explanation => {
			ExplanationActions.selectExplanation({
				sourceFileId: explanation.source_file_id,
				fragment: explanation.fragment,
				start: explanation.fragment_start,
				explanation: explanation
			});
		});
	}

	_handleDeleteClick() {
		ExplanationUtil.destroyExplanation(this.props.explanation.id,
			explanation => {
				ExplanationActions.deselectExplanation();
			}
		);
	}

	_handleContributions() {
	}

	render() {
		let explanation = this.props.explanation;
		let content = '';
		if (this.state.isFormShown) {
			content = (
				<ExplanationForm
					body={explanation.body}
					onCancel={this._handleFormCancel.bind(this)}
					onSubmit={this._handleExplanationSubmit.bind(this)}
				/>
			);
		} else {
      let editButton = '';
      if (PermissionUtil.hasPermission.explanation.update()) {
        editButton = (
          <button className="button-light"
            onClick={this._handleEditClick.bind(this)}>
            Edit
          </button>
        );
      }
      let destroyButton = '';
      if (PermissionUtil.hasPermission.explanation.destroy()) {
        destroyButton = (
          <button className="button-light button-bad"
            onClick={this._handleDeleteClick.bind(this)}>
            Delete
          </button>
        );
      }

			content = (
				<div>
					<p>{explanation.body}</p>
					<div className="form-group">
						{editButton}
						{destroyButton}
					</div>
				</div>
			);
		}

		return (
			<div className="explanation">
				<h3>ANNOTATION</h3>
				<ContributorInfo
					count={explanation.contributor_count}
					onClick={this._handleContributions}
				/>
				<div>
					{content}
				</div>
			</div>
		);
	}
}

class ExplanationDetail extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sourceFieldId: ExplanationSelectionStore.getSourceFieldId(),
			explanation: ExplanationSelectionStore.getExplanation(),
			fragment: ExplanationSelectionStore.getFragment(),
			start: ExplanationSelectionStore.getStart()
		};
	}

	componentDidMount() {
		this.explanationSelectionToken = ExplanationSelectionStore.addListener(this._handleExplanationSelectionChange.bind(this));
	}

	componentWillUnmount() {
		this.explanationSelectionToken.remove();
	}

	_handleExplanationSelectionChange() {
		this.setState({
			sourceFileId: ExplanationSelectionStore.getSourceFieldId(),
			explanation: ExplanationSelectionStore.getExplanation(),
			fragment: ExplanationSelectionStore.getFragment(),
			start: ExplanationSelectionStore.getStart()
		});
	}

	render() {
		if (!ExplanationSelectionStore.isSelecting()) return <div></div>;

		if (!ExplanationSelectionStore.isNewExplanation()) {
			return (
				<ExplanationProvided
					sourceFileId={this.state.sourceFileId}
					fragment={this.state.fragment}
					start={this.state.start}
					explanation={this.state.explanation}
				/>
			);
		} else {
			return (
				<ExplanationEmpty
					fragment={this.state.fragment}
					start={this.state.start}
					sourceFileId={this.state.sourceFileId}
				/>
			);
		}
	}
}

export default ExplanationDetail;
