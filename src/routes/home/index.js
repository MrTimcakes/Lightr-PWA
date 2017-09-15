import { h, Component } from 'preact';
import LightrController from '../../components/lightrController';

import style from './style';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<LightrController />
			</div>
		);
	}
}
