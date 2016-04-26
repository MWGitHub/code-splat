import React from 'react';
import ProjectStore from '../stores/project';
import { Link } from 'react-router';
import SearchStore from '../stores/search';
import WebUtil from '../util/web-util';

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
						<Link to={"/projects/" + main.project.slug} data-intro="Click here to look at a project.">
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

class ProjectListPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			results: [],
			isInfiniteLoading: false
		};
	}

  componentDidMount() {
    this.storeListener = SearchStore.addListener(() => {
			this.setState({ results: this.buildResults() });
		});
		this.paginate(1);
  }

  componentWillUnmount() {
    this.storeListener.remove();
  }

  paginate(page) {
		WebUtil.fetchProjectsPage(page, response => {
			this.setState({
				results: this.buildResults(),
				isInfiniteLoading: false
			});
		});
  }

  nextPage() {
		let meta = SearchStore.meta();
		if (meta.page >= meta.total_pages) {
			return;
		}

		this.paginate(meta.page + 1 || 1);
  }

  buildResults() {
		let newResults = SearchStore.all();
		let results = [];

		// Generate results hash to check for existing results quicker
		let currentResults = {};
		for (let i = 0; i < this.state.results.length; ++i) {
			let result = this.state.results[i];
			currentResults[result.id] = result;
		}

		for (let i = 0; i < newResults.length; ++i) {
			let result = newResults[i];
			if (!currentResults[result.id]) {
				results.push(result);
			}
		}

    return this.state.results.concat(results);
  }

  handleInfiniteLoad() {
		let meta = SearchStore.meta();
		if (meta.page >= meta.total_pages) {
			this.setState({
				isInfiniteLoading: false
			});
			return;
		}

    this.setState({
      isInfiniteLoading: true
    });
		this.nextPage();
  }

  elementInfiniteLoad() {
    return (
			<div className="infinite-list-loading">
				<div className="loader">Loading...</div>
			</div>
		);
  }

  render() {
		let results = this.state.results.map(project => {
			return (
        <li className="list-result" key={'list-project-' + project.slug}>
          <Link to={"/projects/" + project.slug}>
						{project.title} <span className="list-author"><i className="fa fa-users"></i>{project.author}</span>
					</Link>
        </li>
      );
		});

		let meta = SearchStore.meta();
		let resultText = '';
		if (meta.total_count === 1) {
			resultText = '1 result';
		} else {
			resultText = (meta.total_count || 0) + ' results';
		}
    return (
      <article className="search-results list-index">
				<h1>
					Projects
				</h1>
				<ul className="primary-list">
					<Infinite
						elementHeight={60}
						useWindowAsScrollContainer
						infiniteLoadBeginEdgeOffset={200}
						onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
						loadingSpinnerDelegate={this.elementInfiniteLoad()}
						isInfiniteLoading={this.state.isInfiniteLoading}
					>
						{results}
					</Infinite>
				</ul>
      </article>
    );
  }
}

module.exports.ProjectListPage = ProjectListPage;

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
