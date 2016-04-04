import React from 'react';
import { Link } from 'react-router';

class FileList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.files) return <div></div>;

    let files = this.props.files.map(file => {
      return (
        <li key={'file-' + file.slug} className="list-result">
          <Link to={'/projects/' + this.props.projectSlug + '/files/' + file.slug}>
            {file.name}
          </Link>
        </li>
      );
    });

    return (
      <div className="list-index">
				<ul className="primary-list">
					{files}
				</ul>
      </div>
    );
  }
}

export default FileList;
