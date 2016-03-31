import React from 'react';
import ProjectList from './project-list';
import ProjectStore from '../stores/project';
import WebUtil from '../util/web-util';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: ProjectStore.all()
    };
  }

  componentDidMount() {
    this.projectToken = ProjectStore.addListener(() => {
      this.setState({ projects: ProjectStore.all() });
    });
    WebUtil.fetchProjects();
  }

  componentWillUnmount() {
    this.projectToken.remove();
  }

  render() {
    return (
      <div className="home group">
        <div className="home-left">
          <p>Latest on Code Splat</p>
        </div>
        <div className="home-right">
          <p>About Code Splat</p>
          <div className="home-about group">
            <div className="home-about-icon">
              <img src="/assets/images/home-code-icon.png" />
            </div>
            <div className="home-about-description">
              <p>Code Splat is dedicated to crowd-sourced annotation of source code, from “Rapper’s Delight” to To Pimp A Butterfly. Fan favorites Rap Stats & The Rap Map also call Rap Genius home.</p>
              <p>Find out all the latest on <a href="#">Twitter</a> and <a href="#">Facebook</a></p>
            </div>
          </div>
          <p>Hot on Code Splat</p>
          <ProjectList projects={this.state.projects} />
        </div>
      </div>
    );
  }
}

export default Home;
