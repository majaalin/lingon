import React from 'react';
import Navigation from './config/navigation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoaded: true,
      // isAuthenticationReady: false,
      // isAuthenticated: false,
    };
  }

  render() {
    return <Navigation />;
  }
}
