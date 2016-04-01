import React from 'react';

class TextChangeList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
		let changes = this.props.changes.map(change => {
			return (
				<div key={'change-' + change.id}>
					<p>{change.body}</p>
				</div>
			);
		});
    return (
      <div>
        {changes}
      </div>
    );
  }
}

export default TextChangeList;
