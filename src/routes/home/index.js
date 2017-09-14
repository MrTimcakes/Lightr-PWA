import { h, Component } from 'preact';
import LightrController from '../../components/lightrController';

import style from './style';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home route.</p>
				<LightrController />
			</div>
		);
	}
}
