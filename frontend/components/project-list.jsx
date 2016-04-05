import React from 'react';
import ProjectStore from '../stores/project';
import { Link } from 'react-router';

class ProjectListFront extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (!this.props.projects || this.props.projects.length === 0) {
			return <div></div>;
		}

		let projects = this.props.projects.slice();
		let main = projects.shift();
		projects = projects.map(project => {
			return (
				<div key={"project-front-" + project.id} className="front-item front-secondary">
					<h3 className="front-title">
						<Link to={"/projects/" + project.project.slug}>
							{project.project.title}
						</Link>
					</h3>
					<p className="front-description">{project.description}</p>
					<p className="front-link">
						Check out the project <Link to={"/projects/" + project.project.slug}>here!</Link>
					</p>
				</div>
			);
		});

		return (
			<div className="front">
				<div className="front-item front-main">
					<h1 className="front-main-title">
						<Link to={"/projects/" + main.project.slug}>
							{main.project.title}
						</Link>
					</h1>
					<p className="front-description">{main.description}</p>
					<p className="front-link">
						Check out the project <Link to={"/projects/" + main.project.slug}>here!</Link>
					</p>
				</div>
				{projects}
			</div>
		);
	}
}
module.exports.ProjectListFront = ProjectListFront;

class ProjectListHot extends React.Component {
	constructor(props) {
    super(props);
  }

  render() {
		if (!this.props.projects || this.props.projects.length <= 4) {
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
				<div key={'top-project-' + project.slug}
					className="hot-project-mid">
					<h3>
						<Link to={"/projects/" + project.slug}>
							<div className={'language-overlay language-' + project.language}></div>
							{project.title}
							<p className="front-author">
								<i className="fa fa-users"></i>{project.author}
							</p>
							<p className="hot-project-description">
								{project.description}
							</p>
						</Link>
					</h3>
				</div>
			);
		});

    let projectsList = projects.map(project => {
      return (
        <div key={'hot-list-project-' + project.slug}
					className="hot-project">
          <Link to={"/projects/" + project.slug}>
						<div className={'language-overlay language-' + project.language}></div>
						{project.title} <span className="front-author"><i className="fa fa-users"></i>{project.author}</span>
					</Link>
        </div>
      );
    });

    return (
      <div className="hot">
				<div className="hot-project-main">
					<h2>
						<Link to={"/projects/" + main.slug}>
							<div className={'language-overlay language-' + main.language}></div>
							{main.title} <span className="front-hot-author front-author"><i className="fa fa-users"></i>{main.author}</span>
							<p className="hot-project-description">
								{main.description}
							</p>
						</Link>
					</h2>
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
        <li className="list-result" key={'list-project-' + project.slug}>
          <Link to={"/projects/" + project.slug}>
						{project.title} <span className="list-author"><i className="fa fa-users"></i>{project.author}</span>
					</Link>
        </li>
      );
    });

    return (
      <ul className="primary-list">
        {projects}
      </ul>
    );
  }
}

export default ProjectList;
