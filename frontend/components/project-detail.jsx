import React from 'react';
import { Link } from 'react-router';
import ProjectStore from '../stores/project';
import ChangeStore from '../stores/change';
import WebUtil from '../util/web-util';
import FileList from './file-list';

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: ProjectStore.find(this.props.params.slug)
    };
  }

  componentDidMount() {
    this.projectToken = ProjectStore.addListener(() => {
      this.setState({ project: ProjectStore.find(this.props.params.slug) });
    });
    WebUtil.fetchProject(this.props.params.slug);
  }

  componentWillUnmount() {
    this.projectToken.remove();
  }

  componentWillReceiveProps(newProps) {
    WebUtil.fetchProject(newProps.params.slug);
  }

  _handleDelete(e) {
    e.preventDefault();

    WebUtil.destroyProject(this.state.project.id);
    this.context.router.push('/projects');
  }

  render() {
    if (!this.state.project) return <div></div>;

    return (
      <div>
        <h1>{this.state.project.title}</h1>
        <Link to={'/projects/' + this.state.project.slug + '/edit'}>Edit</Link>
        <a href="#" onClick={this._handleDelete.bind(this)}>Delete</a>
        <Link to={'/projects/' + this.state.project.slug + '/files/new'}>Create File</Link>
        <p>{this.state.project.description}</p>
        <FileList files={this.state.project.source_files}
          projectSlug={this.state.project.slug} />
      </div>
    );
  }
}
ProjectDetail.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ProjectDetail;
