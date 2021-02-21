import React from 'react';
import CategoryPicker from './CategoryPicker';
import NewServer from './NewServer';
import ServerInfoBox from './ServerInfoBox';
import WelcomeBar from './WelcomeBar';

export default class Main extends React.Component {
  state = {
    newModalVisible: false,
    results: null
  }

  constructor(props) {
    super(props);
    this.openNewModal = this.openNewModal.bind(this);
    this.closeNewModal = this.closeNewModal.bind(this);
    this.getServers = this.getServers.bind(this);
  }

  componentDidMount() {
    this.getServers();
  }

  renderResults() {
    const { results } = this.state;
    if (!results) return;

    return results.map((server) => {
      return <ServerInfoBox key={server} serverId={server} />
    });
  }

  render() {
    let { newModalVisible } = this.state;

    const renderNewModal = () => {
      if (newModalVisible)
        return <NewServer onClose={this.closeNewModal}/>
    }

    return (
      <div id="app">
        <WelcomeBar onNewClick={this.openNewModal} />
        <div className="columns">
          <div className="column is-3">
            <CategoryPicker/>
          </div>
          <div className="column is-9">
            <div className="section">
              <div className="columns is-multiline is-mobile">
                {this.renderResults()}
              </div>
            </div>
          </div>
        </div>
        {renderNewModal()}
      </div>
    );
  }

  openNewModal() {
    this.setState({newModalVisible: true});
  }

  closeNewModal() {
    this.setState({newModalVisible: false});
  }

  async getServers() {
    let response = await fetch(`${window.backendEndpoint}/servers`);
    let body = await response.json();

    this.setState({results: body.results});
  }
}
