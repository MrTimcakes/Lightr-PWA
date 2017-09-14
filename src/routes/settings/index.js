import { h, Component } from 'preact';
import SettingsController from '../../components/settingsController';
import style from './style';

export default class Settings extends Component {
	render() {
		return (
			<div class={style.settings}>
				<h1>Settings</h1>
				<SettingsController />
			</div>
		);
	}
}
