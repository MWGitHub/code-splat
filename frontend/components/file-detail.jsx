import React from 'react';
import { Link } from 'react-router';
import FileStore from '../stores/file';
import WebUtil from '../util/web-util';
import ChangeStore from '../stores/change';
import TextChangeList from './text-change-list';

class FileDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: FileStore.find(this.props.params.fileSlug),
			changes: null
    };
  }

  componentDidMount() {
    this.fileToken = FileStore.addListener(() => {
      this.setState({ file: FileStore.find(this.props.params.fileSlug) });
    });
		this.changeToken = ChangeStore.addListener(() => {
			this.setState({ changes: ChangeStore.all() });
		});
    WebUtil.fetchSourceFile(this.props.params.slug, this.props.params.fileSlug);
  }

  componentWillUnmount() {
    this.fileToken.remove();
		this.changeToken.remove();
  }

  componentWillReceiveProps(newProps) {
    WebUtil.fetchSourceFile(newProps.params.slug, newProps.params.fileSlug);
		this.setState({
			changes: null
		});
  }

  _handleDelete(e) {
    e.preventDefault();

    WebUtil.destroySourceFile(this.props.params.slug, this.state.file.slug);
    this.context.router.push('/projects/' + this.props.params.slug);
  }

	_handleContributions(e) {
		e.preventDefault();

		let params = this.props.params;
		WebUtil.fetchSourcefileChanges(params.slug, this.state.file.slug);
	}

  render() {
    if (!this.state.file) return <div></div>;

    let editUrl = '/projects/' + this.props.params.slug +
      '/files/' + this.props.params.fileSlug + '/edit';

		let changes = '';
		if (this.state.changes) {
			changes = <TextChangeList changes={this.state.changes} />
		}

    return (
      <div>
        <h1>{this.state.file.name}</h1>
        <Link to={editUrl}>Edit</Link>
        <a href="#" onClick={this._handleDelete.bind(this)}>Delete</a>
				<a href='#' onClick={this._handleContributions.bind(this)}>Contributions</a>
        <p>{this.state.file.body}</p>
				{changes}
      </div>
    );
  }
}
FileDetail.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default FileDetail;
