import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Auth from './Auth';
import Main from './Main';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </Router>
    );
  }
}
