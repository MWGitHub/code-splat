import React from 'react';
import { ProjectListFront, ProjectListHot } from './project-list';
import ProjectStore from '../stores/project';
import WebUtil from '../util/web-util';
import { Link } from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: ProjectStore.all(),
			frontProjects: ProjectStore.allFront()
    };
  }

  componentDidMount() {
    this.projectToken = ProjectStore.addListener(() => {
      this.setState({
				projects: ProjectStore.all(),
				frontProjects: ProjectStore.allFront()
			});
    });
    WebUtil.fetchProjects({
			type: 'hot'
		}, () => {
			WebUtil.fetchFrontPageItems();
		});
  }

  componentWillUnmount() {
    this.projectToken.remove();
  }

  render() {
    return (
      <div className="home group">
        <div className="home-left">
          <p>Latest on Code Splat</p>
					<ProjectListFront projects={this.state.frontProjects} />
        </div>
        <div className="home-right">
          <p>About Code Splat</p>
          <div className="home-about group">
            <div className="home-about-icon">
              <img src="/assets/images/home-code-icon.png" />
            </div>
            <div className="home-about-description">
              <p>Code Splat is dedicated to crowd-sourced annotation of source code, from <a href="#">“Rapper’s Delight”</a> to <a href="#">To Pimp A Butterfly</a>. Fan favorites Rap Stats & The Rap Map also call Code Splat home.</p>
              <p>Find out all the latest on <a href="#">Twitter</a> and <a href="#">Facebook</a></p>
            </div>
          </div>
          <p>Hot on Code Splat</p>
          <ProjectListHot projects={this.state.projects} />
					<p className="home-aside">
						<Link to='/projects'>
							See more on Code Splat &raquo;
						</Link>
					</p>
        </div>
      </div>
    );
  }
}

export default Home;
