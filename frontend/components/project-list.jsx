import React from 'react';
import ProjectStore from '../stores/project';
import { Link } from 'react-router';

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
