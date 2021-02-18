import React from "react";

export default class WelcomeBar extends React.Component {
  state = {
    loggedIn: false
  };

  constructor(props) {
    super(props);

    let clientId = window.discordClientId;
    let redirectUrl = encodeURIComponent(window.redirectUri);
    this.authLink = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=identify%20guilds`;
  }

  render() {
    const { loggedIn } = this.state;

    const renderAuthButton = () => {
      if (!loggedIn){
        return (
          <span className="navbar-item">
            <a className="button" href={this.authLink}>
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

        <div className="hero-body has-text-centered">
          <p className="title">CPP Black Book</p>
          <p className="subtitle">Discover campus life, online</p>
        </div>
      </section>
    );
  }
}
