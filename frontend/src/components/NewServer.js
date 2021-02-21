import React from 'react';

export default class NewServer extends React.Component {
  state = {
    valid: null,
    errorMessage: null,
    invite: null
  }

  constructor(props) {
    super(props);
    this.addServer = this.addServer.bind(this);
    this.getInviteDetails = this.getInviteDetails.bind(this);
  }

  renderInviteInput() {
    let { errorMessage, valid } = this.state;

    let renderErrorMessage = () => {
      if (errorMessage && valid === false)
        return <p class="help is-danger">{errorMessage}</p>
    }

    let inputClasses = 'input ';
    if (valid === false) { // explicit false instead of null
      inputClasses += 'is-danger';
    } else if (valid) {
      inputClasses += 'is-success';
    }

    return (
      <div className="field">
        <label className="label">Invite Link</label>
        <div className="control">
          <input className={inputClasses} type="text" placeholder="https://discord.gg/pYjC82F" onChange={this.getInviteDetails} />
        </div>
        {renderErrorMessage()}
      </div>
    )
  }

  renderConfirmation() {
    let { invite } = this.state;
    let guild = invite.guild;

    return (
      <div>
        <div className="has-text-centered">
          <figure className="image is-96x96 server-ico">
            <img className="is-rounded" src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`} />
          </figure>
          <h1 className="is-size-3">{guild.name}</h1>
        </div>

        <hr/>

        <p className="is-size-4">
          Are you sure?
        </p>
        <p className="mb-2">
          This server will become publically listed on CPP Black Book with an
          invition link. Please ensure that the server's owner is aware of this
          action and has approved for the server to be listed before confirming.
        </p>

        <div className="buttons is-pulled-right">
          <button className="button is-danger">Cancel</button>
          <button onClick={this.addServer} className="button is-success">Add Server</button>
        </div>
      </div>
    )
  }

  render() {
    let { valid } = this.state;

    const renderContent = () => {
      if (!valid){
        return this.renderInviteInput();
      } else {
        return this.renderConfirmation();
      }
    }

    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={this.props.onClose}></div>
        <div className="modal-card" style={{maxHeight: '80vh'}}>
          <header className="modal-card-head">
            <p className="modal-card-title">Add a Server</p>
          </header>
          <section className="modal-card-body">
            <div>
              {renderContent()}
            </div>
          </section>
        </div>
      </div>
    );
  }

  async getInviteDetails(e) {
    let value = e.target.value;

    // Validate value before attempting API call
    if (value === '') {
      this.setState({valid: null});
      return;
    }

    let ex = /^https:\/\/discord\.gg\/([a-zA-Z0-9_]{7,12})$/i;
    let result = ex.exec(value);
    if (result === null) {
      this.setState({valid: false});
      return;
    }

    // Fetch details from Discord API
    let response = await fetch(`https://discord.com/api/v8/invites/${encodeURIComponent(result[1])}?with_counts=true`);
    if (response.status !== 200) {
      this.setState({valid: false, errorMessage: null});
      return;
    }

    let body = await response.json();

    if (body.approximate_member_count <= 7) {
      this.setState({valid: false, errorMessage: 'In order to limit spam, servers require at least 7 members to be listed.'});
      return;
    }

    this.setState({valid: true, invite: body});
  }

  async addServer(e) {
    let { invite } = this.state;

    let response = await fetch(`${window.backendEndpoint}/servers`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({inviteCode: invite.code})
    });

    let body = await response.json();
    if (body.success) {
      window.location.reload();
    } else {
      // TODO: Handle this.
    }
  }
}
