import { h, Component } from 'preact';
import { Router } from 'preact-router';

import AppShell from './appShell';
import Snackbar from 'preact-material-components/Snackbar';
import style from 'preact-material-components/style.css';

import Home from '../routes/home';
import Settings from '../routes/settings';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<AppShell />
				<main class='mdc-toolbar-fixed-adjust' >
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Settings path="/settings" />
					</Router>
					<Snackbar class={"mdc-snackbar--align-start"} ref={bar=>{window.snackbar=bar;}}/>
				</main>
			</div>
		);
	}
}
