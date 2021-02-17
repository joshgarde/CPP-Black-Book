import React from 'react';

export default class CategoryPicker extends React.Component {
  render() {
    return (
      <div class="section">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Categories</p>
          </header>
          <div class="card-content">
            <div>
              <input class="input" type="text" placeholder="Search..."/>
            </div>
            <hr/>
            <div>
              <label class="checkbox">
                <input type="checkbox"/>
                <span> Clubs</span>
              </label>
            </div>
            <div>
              <label class="checkbox">
                <input type="checkbox"/>
                <span> Organizations</span>
              </label>
            </div>
            <div>
              <label class="checkbox">
                <input type="checkbox"/>
                <span> Just Chillin'</span>
              </label>
            </div>
            <div>
              <label class="checkbox">
                <input type="checkbox"/>
                <span> Course-specific</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
