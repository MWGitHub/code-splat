import React from 'react';
import ErrorStore from '../stores/error';

class FormField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorText: null
    };
  }

  componentDidMount() {
    this.errorToken = ErrorStore.addListener(this._handleError.bind(this));
  }

  componentWillUnmount() {
    this.errorToken.remove();
  }

  _handleError() {
    if (!this.props.errorId) return;

    let error = ErrorStore.find(this.props.errorId);
    if (error) {
      this.setState({
        errorText: error.text
      });
    } else {
      this.setState({
        errorText: null
      });
    }
  }

  render() {
    let label = '';
    if (this.props.label) {
      label = (
        <label className="form-label" htmlFor={this.props.id}>
          {this.props.label}
        </label>
      )
    }

    let errorText = '';
    if (this.state.errorText) {
      errorText = (
        <span className="form-error">{this.state.errorText}</span>
      );
    }

    return (
      <div>
        <div className="form-label-group group">
          {label}
          {errorText}
        </div>
        {this.props.children}
      </div>
    );
  }
}
FormField.propTypes = {
  id: React.PropTypes.string,
  errorId: React.PropTypes.string,
  label: React.PropTypes.string
};

export default FormField;
