import React from "react";

export default class WelcomeBar extends React.Component {
  state = {
    loggedIn: null,
    user: null
  };

  constructor(props) {
    super(props);

    const clientId = window.discordClientId;
    const redirectUrl = encodeURIComponent(window.redirectUri);
    this.authLink = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=identify%20guilds`;
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  render() {
    const { loggedIn, user } = this.state;

    const renderStartNav = () => {
      if (loggedIn) {
        return (
          <div className="navbar-start">
            <span className="navbar-item">
              <span>Welcome, {user.username}!</span>
            </span>
          </div>
        );
      }
    }

    const renderEndNav = () => {
      if (loggedIn === false) {
        return (
          <div className="navbar-end">
            <span className="navbar-item">
              <a className="button" href={this.authLink}>
                <span className="icon">
                  <i className="fab fa-discord"></i>
                </span>
                <span>Login with Discord</span>
              </a>
            </span>
          </div>
        );
      } else {
        return (
          <div className="navbar-end">
            <span className="navbar-item">
              <a className="button" onClick={this.props.onNewClick}>
                <span className="icon">
                  <i className="fa fa-plus-circle"></i>
                </span>
                <span>Add a Server</span>
              </a>
            </span>
          </div>
        )
      }
    }

    return (
      <section className="hero is-primary is-bold">
        <div className="hero-head">
          <nav className="navbar">
            <div className="navbar-menu">
              {renderStartNav()}
              {renderEndNav()}
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

  async checkAuthentication() {
    let response = await fetch(`${window.backendEndpoint}/user/whoami`, {
      credentials: 'include'
    });
    let body = await response.json();

    if (body.success && body.user !== null) {
      this.setState({
        loggedIn: true,
        user: body.user
      });
    } else {
      this.setState({loggedIn: false});
    }
  }
}
