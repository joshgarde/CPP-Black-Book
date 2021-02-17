import React from "react";

export default class WelcomeBar extends React.Component {
  state = {
    loggedIn: false
  };

  render() {
    const { loggedIn } = this.state;

    let redirectUrl = encodeURIComponent(window.backendEndpoint + '/discord-auth');
    let clientId = window.discordClientId;
    let authLink = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=identify%20guilds`;

    const renderAuthButton = () => {
      if (!loggedIn){
        return (
          <span className="navbar-item">
            <a className="button" href={authLink}>
              <span className="icon">
                <i className="fab fa-discord"></i>
              </span>
              <span>Login with Discord</span>
            </a>
          </span>
        );
      }
    }

    return (
      <section className="hero is-primary is-bold">
        <div className="hero-head">
          <nav className="navbar">
            <div className="navbar-menu">
              <div className="navbar-end">
                {renderAuthButton()}
              </div>
            </div>
          </nav>
        </div>

        <div className="hero-body">
          <p className="title">CPP Black Book</p>
          <p className="subtitle">Discover campus life, online</p>
        </div>
      </section>
    );
  }
}
