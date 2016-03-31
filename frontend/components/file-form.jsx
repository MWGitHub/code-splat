import React from 'react';
import FileStore from '../stores/file';
import WebUtil from '../util/web-util';

class FileForm extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.file) {
      this.state = {
        name: this.props.file.name,
        body: this.props.file.body
      };
    } else {
      this.state = {
        name: '',
        body: ''
      }
    }
  }

  _onSubmit(e) {
    e.preventDefault();

    if (this.props.file) {
      WebUtil.updateSourceFile(
        this.props.file.slug,
        {
          name: this.state.name,
          body: this.state.body,
        }, this.props.onSuccess
      );
    } else {
      WebUtil.createProject({
        name: this.state.name,
        body: this.state.body
      }, this.props.onSuccess);

      this.setState({
        name: '',
        body: ''
      });
    }

    e.target.reset();
  }

  render() {
    let handleTitleChange = e => {
      this.setState({name: e.target.value});
    };
    let handleDescChange = e => {
      this.setState({body: e.target.value});
    };
    let headerText = 'Create Project';
    let buttonText = 'Create Project';
    if (this.props.file) {
      headerText = 'Update Project';
      buttonText = 'Update Project';
    }

    return (
      <form className="form" onSubmit={this._onSubmit.bind(this)}>
        <h1>{headerText}</h1>
        <div className="form-group">
          <label htmlFor="name">Title</label>
          <input type="text"
            id="name"
            onChange={handleTitleChange}
            value={this.state.name} />
        </div>

        <div className="form-group">
          <label htmlFor="body">Description</label>
          <textarea onChange={handleDescChange} id="body"
            value={this.state.description}></textarea>
        </div>

        <div className="form-group">
          <input type="submit" value={buttonText} />
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
      <FileForm onSuccess={file => {
        this.context.router.push('/projects/' + file.slug);
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
      file: FileStore.find(this.props.params.slug)
    };
  }

  componentDidMount() {
    this.projectToken = FileStore.addListener(() => {
      this.setState({file: FileStore.find(this.props.params.slug)});
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
    if (!this.state.file) return <div></div>;

    return (
      <FileForm file={this.state.file}
        onSuccess={file => {
        this.context.router.push('/projects/' + file.slug);
      }} />
    )
  }
}
EditProjectForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};
module.exports.EditProjectForm = EditProjectForm;


export default FileForm;
