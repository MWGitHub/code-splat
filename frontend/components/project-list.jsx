import React from 'react';
import ProjectStore from '../stores/project';
import { Link } from 'react-router';

class ProjectListHot extends React.Component {
	constructor(props) {
    super(props);
  }

  render() {
		if (!this.props.projects || this.props.projects.length === 0) {
			return <div></div>;
		}

		let projects = this.props.projects.slice();
		let main = projects.shift();
		let topFour = [];
		for (let i = 0; i < 4; ++i) {
			topFour.push(projects.shift());
		}
		topFour = topFour.map(project => {
			return (
				<div key={'project-' + project.slug} className="hot-project-mid">
					<h3><Link to={"/projects/" + project.slug}>{project.title}</Link></h3>
				</div>
			);
		});

    let projectsList = projects.map(project => {
      return (
        <div key={'project-' + project.slug}>
          <Link to={"/projects/" + project.slug}>{project.title}</Link>
        </div>
      );
    });

    return (
      <div className="hot">
				<div className="hot-project-main">
					<h2><Link to={"/projects/" + main.slug}>{main.title}</Link></h2>
				</div>
				<div className="hot-project-top-four group">
					{topFour}
				</div>
				<div className="hot-project-list">
					{projectsList}
				</div>
      </div>
    );
  }
}
module.exports.ProjectListHot = ProjectListHot;

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let projects = this.props.projects.map(project => {
      return (
        <div key={'project-' + project.slug}>
          <Link to={"/projects/" + project.slug}>{project.title}</Link>
        </div>
      );
    });

    return (
      <div>
        {projects}
      </div>
    );
  }
}

export default ProjectList;
