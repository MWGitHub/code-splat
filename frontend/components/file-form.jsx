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
        this.props.projectSlug,
        this.props.file.slug,
        {
          name: this.state.name,
          body: this.state.body,
        }, this.props.onSuccess
      );
    } else {
      WebUtil.createSourceFile(
        this.props.projectSlug,
        {
          name: this.state.name,
          body: this.state.body
        }, this.props.onSuccess
      );

      this.setState({
        name: '',
        body: ''
      });
    }

    e.target.reset();
  }

  render() {
    let handleNameChange = e => {
      this.setState({name: e.target.value});
    };
    let handleBodyChange = e => {
      this.setState({body: e.target.value});
    };
    let headerText = 'Create File';
    let buttonText = 'Create File';
    if (this.props.file) {
      headerText = 'Update File';
      buttonText = 'Update File';
    }

    return (
      <form className="form" onSubmit={this._onSubmit.bind(this)}>
        <h1>{headerText}</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text"
            id="name"
            onChange={handleNameChange}
            value={this.state.name} />
        </div>

        <div className="form-group">
          <label htmlFor="body">Description</label>
          <textarea onChange={handleBodyChange} id="body"
            value={this.state.body}></textarea>
        </div>

        <div className="form-group">
          <input type="submit" value={buttonText} />
        </div>
      </form>
    );
  }
}

class NewFileForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FileForm projectSlug={this.props.params.slug} onSuccess={file => {
        this.context.router.push('/projects/' + this.props.params.slug + '/files/' + file.slug);
      }} />
    );
  }
}
NewFileForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};
module.exports.NewFileForm = NewFileForm;

class EditFileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: FileStore.find(this.props.params.fileSlug)
    };
  }

  componentDidMount() {
    this.projectToken = FileStore.addListener(() => {
      this.setState({file: FileStore.find(this.props.params.fileSlug)});
    });
    WebUtil.fetchSourceFile(this.props.params.slug, this.props.params.fileSlug);
  }

  componentWillUnmount() {
    this.projectToken.remove();
  }

  componentWillReceiveProps(newProps) {
    WebUtil.fetchSourceFile(this.props.params.slug, this.props.params.fileSlug);
  }

  render() {
    if (!this.state.file) return <div></div>;

    return (
      <FileForm projectSlug={this.props.params.slug} file={this.state.file}
        onSuccess={file => {
        this.context.router.push('/projects/' + this.props.params.slug + '/files/' + file.slug);
      }} />
    )
  }
}
EditFileForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};
module.exports.EditFileForm = EditFileForm;


export default FileForm;
