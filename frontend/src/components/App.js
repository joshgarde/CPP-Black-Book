import React from 'react';
import CategoryPicker from './CategoryPicker';
import ServerInfoBox from './ServerInfoBox';
import WelcomeBar from './WelcomeBar';

export default class App extends React.Component {
  render() {
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
}
