import React from 'react';

class ContributorInfo extends React.Component {
	_handleClick(e) {
		e.preventDefault();

		this.props.onClick();
	}

	render() {
		let contributors = ' Contributor';
		let count = this.props.count;
		if (count === 1) {
			contributors = count + contributors;
		} else {
			contributors = count + contributors + 's';
		}

		return (
			<a className="contributors" href='#'
				onClick={this._handleClick.bind(this)}>
				{contributors}
			</a>
		)
	}
}

export default ContributorInfo;
