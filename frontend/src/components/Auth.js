import React from 'react';

export default class Auth extends React.Component {
  componentDidMount() {
    let code = new URL(window.location).searchParams.get('code');
    let redirectUri = window.redirectUri;

    authenticate(code, redirectUri);
  }

  render() {
    return (
      <section className="hero is-large">
        <div className="hero-body">
          <div className="has-text-centered">
            <p className="subtitle">Authorizing...</p>
            <p className="subtitle">We'll redirect you in a second</p>
          </div>
        </div>
      </section>
    )
  }
}

async function authenticate(code, redirectUri) {
  let response = await fetch(`${window.backendEndpoint}/auth`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({code, redirectUri})
  });

  let json = await response.json();
  console.log(json);
}
