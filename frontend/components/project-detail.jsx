import React from 'react';
import { Link } from 'react-router';
import ProjectStore from '../stores/project';
import ChangeStore from '../stores/change';
import ReplyStore from '../stores/reply';
import WebUtil from '../util/web-util';
import FileList from './file-list';
import TextChangeList from './text-change-list';
import ReplyForm from './reply-form';
import ReplyDetail from './reply-detail';

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: ProjectStore.find(this.props.params.slug),
			changes: null,
			replies: null
    };
  }

  componentDidMount() {
    this.projectToken = ProjectStore.addListener(() => {
      this.setState({
				project: ProjectStore.find(this.props.params.slug)
			});
    });
		this.changeToken = ChangeStore.addListener(() => {
			this.setState({
				changes: ChangeStore.all()
			});
		});
		this.replyToken = ReplyStore.addListener(() => {
			this.setState({
				replies: ReplyStore.allProjectReplies()
			});
		})
    WebUtil.fetchProject(this.props.params.slug, (project) => {
			WebUtil.fetchProjectReplies(project.id);
		});
  }

  componentWillUnmount() {
    this.projectToken.remove();
		this.changeToken.remove();
		this.replyToken.remove();
  }

  componentWillReceiveProps(newProps) {
		this.setState({
			changes: null,
			replies: null
		});
    WebUtil.fetchProject(newProps.params.slug, (project) => {
			WebUtil.fetchProjectReplies(project.id);
		});
  }

  _handleDelete(e) {
    e.preventDefault();

    WebUtil.destroyProject(this.state.project.id);
    this.context.router.push('/projects');
  }

	_handleContributions(e) {
		e.preventDefault();

		WebUtil.fetchProjectChanges(this.state.project.slug);
	}

	_handleReply(reply) {
		WebUtil.createProjectReply(this.state.project.id, reply);
	}

  render() {
    if (!this.state.project) return <div></div>;

		let changes = '';
		if (this.state.changes) {
			changes = <TextChangeList changes={this.state.changes} />
		}

		let replies = '';
		if (this.state.replies) {
			replies = this.state.replies.map(reply => {
				return (
					<ReplyDetail key={'reply-' + reply.id} reply={reply} />
				);
			});
		}

    return (
      <div className="project-detail detail">
        <h1>{this.state.project.title}</h1>
        <Link to={'/projects/' + this.state.project.slug + '/edit'}>Edit</Link>
        <a href="#" onClick={this._handleDelete.bind(this)}>Delete</a>
        <Link to={'/projects/' + this.state.project.slug + '/files/new'}>Create File</Link>
				<a href='#' onClick={this._handleContributions.bind(this)}>Contributions</a>
				<ReplyForm onSubmit={this._handleReply.bind(this)} />
        <p>{this.state.project.description}</p>
        <FileList files={this.state.project.source_files}
          projectSlug={this.state.project.slug} />
				{replies}
				{changes}
      </div>
    );
  }
}
ProjectDetail.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ProjectDetail;
