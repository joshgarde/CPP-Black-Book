import React from 'react';

export default class Auth extends React.Component {
  state = {
    authenticated: false,
    error: false,
    errorMessage: null
  }

  componentDidMount() {
    let code = new URL(window.location).searchParams.get('code');
    let redirectUri = window.redirectUri;

    this.authenticate(code, redirectUri);
  }

  render() {
    const mainText = () => {
      if (this.state.error === true) {
        return (
          <div className="has-text-centered">
            <p className="subtitle">An error occured</p>
            <p className="subtitle">{this.state.errorMessage}</p>
          </div>
        )
      }

      if (this.state.authenticated === true) {
        return (
          <div className="has-text-centered">
            <p className="subtitle">Successfully authenticated!</p>
            <p className="subtitle">Redirecting now...</p>
          </div>
        )
      }

      if (this.state.authenticated === false) {
        return (
          <div className="has-text-centered">
            <p className="subtitle">Authenticating...</p>
            <p className="subtitle">We'll redirect you in a second</p>
          </div>
        )
      }
    }

    return (
      <section className="hero is-large">
        <div className="hero-body">
          {mainText()}
        </div>
      </section>
    )
  }

  async authenticate(code, redirectUri) {
    let response = await fetch(`${window.backendEndpoint}/user/auth`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({code, redirectUri})
    });

    let body = await response.json();

    if (body.success === true) {
      this.setState({ authenticated: true });

      setTimeout(() => { window.location = "/" }, 1000);
    } else {
      this.setState({
        error: true,
        errorMessage: body.message
      });
    }
  }
}
