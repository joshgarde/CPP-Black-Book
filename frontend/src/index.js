import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import './index.scss';

window.backendEndpoint = process.env.BACKEND_ENDPOINT;
window.discordClientId = process.env.DISCORD_CLIENT_ID;
window.redirectUri = `${window.location.origin}/auth`;

ReactDOM.render(<App />, document.getElementById("root"));
