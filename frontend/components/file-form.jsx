import React from 'react';
import FileStore from '../stores/file';
import WebUtil from '../util/web-util';
import Code from './code';

class FileForm extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.file) {
      this.state = {
        name: this.props.file.name,
				language: this.props.file.language,
        body: this.props.file.body
      };
    } else {
      this.state = {
        name: '',
				language: '',
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
					language: this.state.language,
          body: this.state.body,
        }, this.props.onSuccess
      );
    } else {
      WebUtil.createSourceFile(
        this.props.projectSlug,
        {
          name: this.state.name,
					language: this.state.language,
          body: this.state.body
        }, this.props.onSuccess
      );

      this.setState({
        name: '',
				language: '',
        body: ''
      });
    }

    e.target.reset();
  }

	_handleCancel(e) {
		e.preventDefault();

		this.props.onCancel();
	}

  render() {
    let handleNameChange = e => {
      this.setState({name: e.target.value});
    };
		let handleLanguageChange = e => {
			this.setState({language: e.target.value});
		};
    let handleBodyChange = e => {
      this.setState({body: e});
    };
    let headerText = 'Create File';
    let buttonText = 'Create File';
    if (this.props.file) {
      headerText = 'Update File';
      buttonText = 'Update File';
    }

		let languages = window.codeSplat.codeLanguages.map(language => {
			return (
				<option key={'language-' + language} value={language}>
					{language}
				</option>
			);
		});

		// <textarea onChange={handleBodyChange} id="body"
		// 	value={this.state.body}></textarea>
    return (
      <form className="form-lite" onSubmit={this._onSubmit.bind(this)}>
        <h1>{headerText}</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text"
            id="name"
            onChange={handleNameChange}
            value={this.state.name} />
        </div>

				<div className="form-group">
					<label htmlFor="language">Language</label>
					<select value={this.state.language} onChange={handleLanguageChange}>
						<option value=''> </option>
						{languages}
					</select>
				</div>

        <div className="form-group">
          <label htmlFor="body">Code</label>
					<Code
						onChange={handleBodyChange}
						id="body"
						language={this.state.language}
						body={this.props.body}
						file={{}}
						isEditing={true}
					/>

        </div>

        <div className="form-group">
          <input className="button-light button-good" type="submit" value={buttonText} />
          <input className="button-light button-neutral" type="submit" value="Cancel" onClick={this._handleCancel.bind(this)} />
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
      <FileForm
				projectSlug={this.props.params.slug}
				onSuccess={file => {
	        this.context.router.push('/projects/' + this.props.params.slug + '/files/' + file.slug);
	      }}
				onCancel={() => {
					this.context.router.push('/projects/' + this.props.params.slug);
				}}
			/>
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
      <FileForm
				projectSlug={this.props.params.slug}
				file={this.state.file}
        onSuccess={file => {
	        this.context.router.push('/projects/' + this.props.params.slug + '/files/' + file.slug);
	      }}
				onCancel={() => {
					this.context.router.push('/projects/' + this.props.params.slug + '/files/' + this.state.file.slug);
				}}
				body={this.state.file.body}
			/>
    )
  }
}
EditFileForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};
module.exports.EditFileForm = EditFileForm;


export default FileForm;
