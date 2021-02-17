import React from 'react';
import CategoryPicker from './CategoryPicker';
import ServerInfoBox from './ServerInfoBox';
import WelcomeBar from './WelcomeBar';

export default class App extends React.Component {
  render() {
    return (
      <div id="app">
        <WelcomeBar/>
        <div class="columns">
          <div class="column is-3">
            <CategoryPicker/>
          </div>
          <div class="column">
            <div class="section columns">
              <ServerInfoBox/>
              <ServerInfoBox/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
