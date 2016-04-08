import React from 'react';
import ProjectStore from '../stores/project';
import WebUtil from '../util/web-util';

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.project) {
      this.state = {
        title: this.props.project.title,
				language: this.props.project.language,
        description: this.props.project.description
      };
    } else {
      this.state = {
        title: '',
				language: '',
        description: ''
      }
    }
  }

  _onSubmit(e) {
    e.preventDefault();

    if (this.props.project) {
      WebUtil.updateProject(
        this.props.project.id,
        {
          title: this.state.title,
					language: this.state.language,
          description: this.state.description,
        }, this.props.onSuccess
      );
    } else {
      WebUtil.createProject({
        title: this.state.title,
				language: this.state.language,
        description: this.state.description
      }, this.props.onSuccess);

      this.setState({
        title: '',
				language: '',
        description: ''
      });
    }

    e.target.reset();
  }

  render() {
    let handleTitleChange = e => {
      this.setState({title: e.target.value});
    };
		let handleLanguageChange = e => {
			this.setState({language: e.target.value});
		};
    let handleDescChange = e => {
      this.setState({description: e.target.value});
    };
    let headerText = 'Create Project';
    let buttonText = 'Create Project';
    if (this.props.project) {
      headerText = 'Update Project';
      buttonText = 'Update Project';
    }

		let languages = window.codeSplat.codeLanguages.map(language => {
			return (
				<option key={'language-' + language} value={language}>
					{language}
				</option>
			);
		});

    return (
      <form className="form" onSubmit={this._onSubmit.bind(this)}>
        <h1>{headerText}</h1>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text"
            id="title"
            onChange={handleTitleChange}
            value={this.state.title} />
        </div>

				<div className="form-group">
					<label htmlFor="language">Language</label>
					<select value={this.state.language} onChange={handleLanguageChange}>
						<option value=''> </option>
						{languages}
					</select>
				</div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea onChange={handleDescChange} id="description"
            value={this.state.description}></textarea>
        </div>

        <div className="form-group">
          <input className="button-full" type="submit" value={buttonText} />
        </div>
      </form>
    );
  }
}

class NewProjectForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ProjectForm onSuccess={project => {
        this.context.router.push('/projects/' + project.slug);
      }} />
    );
  }
}
NewProjectForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};
module.exports.NewProjectForm = NewProjectForm;

class EditProjectForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: ProjectStore.find(this.props.params.slug)
    };
  }

  componentDidMount() {
    this.projectToken = ProjectStore.addListener(() => {
      this.setState({project: ProjectStore.find(this.props.params.slug)});
    });
    WebUtil.fetchProject(this.props.params.slug);
  }

  componentWillUnmount() {
    this.projectToken.remove();
  }

  componentWillReceiveProps(newProps) {
    WebUtil.fetchProject(this.props.params.slug);
  }

  render() {
    if (!this.state.project) return <div></div>;

    return (
      <ProjectForm project={this.state.project}
        onSuccess={project => {
          this.context.router.push('/projects/' + project.slug);
      }} />
    )
  }
}
EditProjectForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};
module.exports.EditProjectForm = EditProjectForm;


export default ProjectForm;
