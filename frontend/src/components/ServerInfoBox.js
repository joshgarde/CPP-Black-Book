import React from 'react';

export default class ServerInfoBox extends React.Component {
  render() {
    return (
      <div className="column is-6">
        <div className="box">
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img className="is-rounded" src="https://cdn.discordapp.com/icons/499266097833574401/b24609f47b82e713d9216ea351ada040.png"/>
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p className="is-size-5	mb-0">CPP Computer Science</p>
                <p><small>Online: 234, Total: 543</small></p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum erat eros, mattis pulvinar mauris in, pellentesque egestas lacus. Proin consequat erat dui, a tincidunt est laoreet in.</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }
}
