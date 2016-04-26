import React from 'react';
import { ProjectListFront, ProjectListHot } from './project-list';
import ProjectStore from '../stores/project';
import WebUtil from '../util/web-util';
import { Link } from 'react-router';
import TourUtil from '../util/tour-util';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: ProjectStore.all(),
			frontProjects: null
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

    TourUtil.exit();
  }

  componentDidUpdate() {
    if (this.state.frontProjects.length > 0) {
      TourUtil.play('home');
    }
  }

  render() {
    let projectsFront = '';
    if (this.state.frontProjects) {
      projectsFront = (
        <ProjectListFront ref="projectFront"
          projects={this.state.frontProjects} />
      );
    }
    return (
      <div className="home group">
        <div className="left">
          <p>Latest on Code Splat</p>
					{projectsFront}
        </div>
        <div className="right">
          <p>About Code Splat</p>
          <div className="home-about group">
            <div className="home-about-icon">
              <img src={window.codeSplat.homeIconPath} />
            </div>
            <div className="home-about-description">
              <p>Code Splat is dedicated to crowd-sourced annotation of source code, from <Link to="/projects/simple-sorting/files/merge_sort-rb">Merge Sort</Link> to <a href="/projects/simple-sorting/files/bubble_sort-rb">Bubble Sort</a>.</p>
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
