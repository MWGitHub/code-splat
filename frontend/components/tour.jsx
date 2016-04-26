import React from 'react';
import TourStore from '../stores/tour';
import IntroJS from 'intro.js';

class Tour extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false
    };
  }

  componentDidMount() {
    this.tourToken = TourStore.addListener(this._handleChange.bind(this));
  }

  componentWillUnmount() {
    this.tourToken.remove();
  }

  _handleChange() {
    this.setState({
      start: true
    });
  }

  render() {
    if (this.state.start) {
      IntroJS.introJs().start();
    }

    return (
      <div></div>
    )
  }
}

export default Tour;
