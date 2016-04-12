import React from 'react';
import Settings from '../constants/settings';

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

    if (Settings.SHOW_CONTRIBUTOR_DETAIL) {
      return (
        <a className="contributors" href='#'
          onClick={this._handleClick.bind(this)}>
          {contributors}
        </a>
      );
    } else {
      return (
        <span className="contributors" href='#'>
          {contributors}
        </span>
      );
    }

	}
}

export default ContributorInfo;
