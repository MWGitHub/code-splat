import React from 'react';
import { Link } from 'react-router';
import FileStore from '../stores/file';
import WebUtil from '../util/web-util';

class FileDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: FileStore.find(this.props.params.fileSlug)
    };
  }

  componentDidMount() {
    this.fileToken = FileStore.addListener(() => {
      this.setState({ file: FileStore.find(this.props.params.fileSlug) });
    });
    WebUtil.fetchSourceFile(this.props.params.slug, this.props.params.fileSlug);
  }

  componentWillUnmount() {
    this.fileToken.remove();
  }

  componentWillReceiveProps(newProps) {
    WebUtil.fetchSourceFile(newProps.params.slug, newProps.params.fileSlug);
  }

  _handleDelete(e) {
    e.preventDefault();

    WebUtil.destroySourceFile(this.props.params.slug, this.state.file.slug);
    this.context.router.push('/projects/' + this.props.params.slug);
  }

  render() {
    if (!this.state.file) return <div></div>;

    return (
      <div>
        <h1>{this.state.file.name}</h1>
        <Link to={'edit'}>Edit</Link>
        <a href="#" onClick={this._handleDelete.bind(this)}>Delete</a>
        <p>{this.state.file.body}</p>
      </div>
    );
  }
}
FileDetail.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default FileDetail;
