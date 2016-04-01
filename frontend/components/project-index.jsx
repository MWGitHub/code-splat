import React from 'react';
import { Link } from 'react-router';
import ProjectStore from '../stores/project';
import ProjectList from './project-list';
import WebUtil from '../util/web-util';

class ProjectIndex extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			projects: []
		};
		console.log(props);
	}

	componentDidMount() {
		this.projectToken = ProjectStore.addListener(() => {
			this.setState({ projects: ProjectStore.all() })
		});
		WebUtil.fetchProjects();
	}

	componentWillUnmount() {
		this.projectToken.remove();
	}

	render() {

		return (
			<div className="list-index">
				<p>Everything in <span className="highlight">Code Splat</span></p>
				<ProjectList projects={this.state.projects} />
			</div>
		);
	}
}

export default ProjectIndex;
