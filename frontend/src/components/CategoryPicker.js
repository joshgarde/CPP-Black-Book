import React from 'react';

export default class CategoryPicker extends React.Component {
  render() {
    return (
      <div className="section">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Categories</p>
          </header>
          <div className="card-content">
            <div>
              <input className="input" type="text" placeholder="Search..."/>
            </div>
            <hr/>
            <div>
              <label className="checkbox">
                <input type="checkbox"/>
                <span> Clubs</span>
              </label>
            </div>
            <div>
              <label className="checkbox">
                <input type="checkbox"/>
                <span> Organizations</span>
              </label>
            </div>
            <div>
              <label className="checkbox">
                <input type="checkbox"/>
                <span> Just Chillin'</span>
              </label>
            </div>
            <div>
              <label className="checkbox">
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
