import React from 'react';
import { Link } from 'react-router';
import ProjectStore from '../stores/project';
import ChangeStore from '../stores/change';
import ReplyStore from '../stores/reply';
import WebUtil from '../util/web-util';
import FileList from './file-list';
import TextChangeList from './text-change-list';
import ReplyForm from './reply-form';
import ReplyList from './reply-list';
import ContributorInfo from './contributor-info';

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

	_handleContributions() {
		WebUtil.fetchProjectChanges(this.state.project.id);
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
		if (this.state.replies && this.state.replies.length > 0) {
			replies = (
				<div className="section replies">
					<h3 className="section-header">Replies</h3>
					<ReplyList replies={this.state.replies} />
				</div>
			)
		}

    return (
      <div className="project-detail detail group">
				<div className="full">
					<h1>{this.state.project.title}</h1>
				</div>
				<div className="left">
					<ContributorInfo
						count={this.state.project.contributor_count}
						onClick={this._handleContributions.bind(this)}
					/>
					<div className="section">
						<h3 className="section-header">Description</h3>
						<p>{this.state.project.description}</p>
					</div>
					<div className="detail-actions group">
						<Link to={'/projects/' + this.state.project.slug + '/edit'}>edit project</Link>
						<a href="#" onClick={this._handleDelete.bind(this)}>delete project</a>
					</div>
					<div className="reply-group">
						<ReplyForm onSubmit={this._handleReply.bind(this)} />
						{replies}
					</div>
				</div>
				<div className="right">
					<h2>FILES</h2>
					<Link to={'/projects/' + this.state.project.slug + '/files/new'}>Create File</Link>
					<FileList files={this.state.project.source_files}
						projectSlug={this.state.project.slug} />
				</div>
				{changes}
      </div>
    );
  }
}
ProjectDetail.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ProjectDetail;
