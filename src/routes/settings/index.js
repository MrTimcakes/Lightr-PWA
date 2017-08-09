import { h, Component } from 'preact';
import style from './style';

export default class Settings extends Component {
	render() {
		return (
			<div class={style.settings}>
				<h1>Settings</h1>
				<p>This is the Settings route.</p>
			</div>
		);
	}
}
