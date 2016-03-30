import React from 'react';

class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="status-page">
        <h1>404</h1>
        <p>Page not found!</p>
      </div>
    );
  }
}

export default NotFound;
