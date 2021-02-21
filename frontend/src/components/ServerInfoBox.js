import React from 'react';

export default class ServerInfoBox extends React.Component {
  state = {
    loaded: false,
    data: null
  }

  constructor(props) {
    super(props);
    this.loadServerData = this.loadServerData.bind(this);
  }

  componentDidMount() {
    this.loadServerData();
  }

  renderContent() {
    let { loaded, data } = this.state;

    const renderDescription = () => {
      if (data.description)
        return <p>{data.description}</p>
    }

    if (!loaded) {
      return this.renderLoader();
    } else {
      return (
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img className="is-rounded" src={`https:\/\/cdn.discordapp.com/icons/${data.id}/${data.icon}.png?size=64`} />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p className="is-size-5	mb-0">{data.name}</p>
              <p><small>Online: {data.approximate_presence_count}, Total: {data.approximate_member_count}</small></p>
              {renderDescription()}
            </div>
          </div>
        </article>
      )
    }
  }

  renderLoader() {
    return (
      <div className="sk-grid sk-center">
        <div className="sk-grid-cube"></div>
        <div className="sk-grid-cube"></div>
        <div className="sk-grid-cube"></div>
        <div className="sk-grid-cube"></div>
        <div className="sk-grid-cube"></div>
        <div className="sk-grid-cube"></div>
        <div className="sk-grid-cube"></div>
        <div className="sk-grid-cube"></div>
        <div className="sk-grid-cube"></div>
      </div>
    )
  }

  render() {
    return (
      <div className="column is-4">
        <div className="box">
          {this.renderContent()}
        </div>
      </div>
    )
  }

  async loadServerData() {
    let response = await fetch(`${window.backendEndpoint}/servers/${this.props.serverId}`);
    let body = await response.json();

    if (body.success) {
      this.setState({loaded: true, data: body.server});
    } else {
      // TODO: Handle this
    }
  }
}
