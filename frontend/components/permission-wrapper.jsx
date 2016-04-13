import React from 'react';
import PermissionUtil from '../util/permission-util';
import SessionStore from '../stores/session';

class PermissionWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: SessionStore.getUser(),
      isHovering: false
    }
  }

  componentDidMount() {
    this.sessionToken = SessionStore.addListener(() => {
      currentUser: SessionStore.getUser()
    });
  }

  componentWillUnmount() {
    this.sessionToken.remove();
  }

  _handleMouseEnter() {
    this.setState({isHovering: true});
  }

  _handleMouseLeave() {
    this.setState({isHovering: false});
  }

  render() {
    let permissionDialog = '';
    let coverDialog = '';
    if (this.state.isHovering) {
      let isShowing = false;
      if (this.props.threshold) {
        isShowing = !this.props.threshold();
      }
      if (this.props.owner &&
        this.state.currentUser &&
        this.state.currentUser.id === this.props.owner) {
          isShowing = false
        }

        if (isShowing) {
          permissionDialog = (
            <div className="permission-dialog">
              <p>Not enough score to perform action</p>
            </div>
          );
          coverDialog = <div className="permission-cover"> </div>
        }
    }

    return (
      <div
        className="permission-wrapper"
        onMouseEnter={this._handleMouseEnter.bind(this)}
        onMouseLeave={this._handleMouseLeave.bind(this)}
      >
        {permissionDialog}
        {coverDialog}
        {this.props.children}
      </div>
    );
  }
}

export default PermissionWrapper;
