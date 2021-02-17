import React from 'react';

export default class ServerInfoBox extends React.Component {
  render() {
    return (
      <div class="column is-6">
        <div class="box">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img class="is-rounded" src="https://cdn.discordapp.com/icons/499266097833574401/b24609f47b82e713d9216ea351ada040.png"/>
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p class="is-size-5	mb-0">CPP Computer Science</p>
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
