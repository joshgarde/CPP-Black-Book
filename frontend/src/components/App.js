import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Auth from './Auth';
import CategoryPicker from './CategoryPicker';
import ServerInfoBox from './ServerInfoBox';
import WelcomeBar from './WelcomeBar';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    );
  }
}

function Main() {
  return (
    <div id="app">
      <WelcomeBar/>
      <div className="columns">
        <div className="column is-3">
          <CategoryPicker/>
        </div>
        <div className="column">
          <div className="section columns">
            <ServerInfoBox/>
            <ServerInfoBox/>
          </div>
        </div>
      </div>
    </div>
  );
}
