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
        <div key={'file-' + file.slug}>
          <Link to={'/projects/' + this.props.projectSlug + '/files/' + file.slug}>
            {file.name}
          </Link>
        </div>
      );
    });

    return (
      <div>
        {files}
      </div>
    );
  }
}

export default FileList;
