import React from 'react';
import { Link } from 'react-router';

class FileList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.files) return <div></div>;

    let files = this.props.files.map((file, i) => {
      let link = '';
      if (i === 0) {
        link = (
          <li key={'file-' + file.slug} className="list-result"
            data-intro="Click the file to explore the code.">
            <Link to={'/projects/' + this.props.projectSlug + '/files/' + file.slug}>
              {file.name}
            </Link>
          </li>
        )
      } else {
        link = (
          <li key={'file-' + file.slug} className="list-result">
            <Link to={'/projects/' + this.props.projectSlug + '/files/' + file.slug}>
              {file.name}
            </Link>
          </li>
        );
      }
      return link;
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
