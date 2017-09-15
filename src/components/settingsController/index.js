import localforage from 'localforage';

import { h, Component } from 'preact';

import List from 'preact-material-components/List';
import Formfield from 'preact-material-components/Formfield';
import Textfield from 'preact-material-components/Textfield';
import Checkbox from 'preact-material-components/Checkbox';
import Button from 'preact-material-components/Button';

import style from './style';

export default class SettingsController extends Component {
	constructor(props) {
	    super(props);
	    this.state = { //set defaults
				settings: {
					MQTTHOST: location.hostname,
					MQTTPORT: 1885,
					MQTTCLIENTPREFIX: undefined,
					MQTTPATH: undefined,
					MQTTUSERNAME: "lightr",
					MQTTPASSWORD: undefined,
					MQTTKEEPALIVE: 60,
					MQTTTIMEOUT: 60,
					MQTTSSL: true
				}
	    };

	    this.handleInputChange = this.handleInputChange.bind(this);
	  }

	  handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

			var tempState = this.state.settings;
			tempState[name] = value;
	    this.setState({settings: tempState});
	  }

	componentDidMount() {
		var that = this;
		localforage.getItem('MQTTSETTINGS').then(function(value) {
			if(value!=null){
				storageToState(value, that);
			}else{
				//Not yet set
			}
		}).catch(function(err) {
			console.log(err);
		});
	}

	render() {
		return (
			<div class={ style.settingsController }>
				<Formfield id="settingsForm">
					<list>
						<List.Item><Textfield name="MQTTHOST" 				label="MQTT Host" 					 onInput={this.handleInputChange} value={this.state.settings.MQTTHOST} /></List.Item>
						<List.Item><Textfield name="MQTTPORT" 				label="MQTT WebSocket Port"  onInput={this.handleInputChange} value={this.state.settings.MQTTPORT} /></List.Item>
						<List.Item><Textfield name="MQTTCLIENTPREFIX" label="MQTT Client-Prefix" 	 onInput={this.handleInputChange} value={this.state.settings.MQTTCLIENTPREFIX} /></List.Item>
						<List.Item><Textfield name="MQTTPATH" 				label="MQTT Path" 					 onInput={this.handleInputChange} value={this.state.settings.MQTTPATH} /></List.Item>
						<List.Item><Textfield name="MQTTUSERNAME" 		label="MQTT Username" 			 onInput={this.handleInputChange} value={this.state.settings.MQTTUSERNAME} /></List.Item>
						<List.Item><Textfield name="MQTTPASSWORD" 		label="MQTT Password" 			 onInput={this.handleInputChange} value={this.state.settings.MQTTPASSWORD} /></List.Item>
						<List.Item><Textfield name="MQTTKEEPALIVE" 		label="MQTT Keep-Alive" 		 onInput={this.handleInputChange} value={this.state.settings.MQTTKEEPALIVE} /></List.Item>
						<List.Item><Textfield name="MQTTTIMEOUT" 			label="MQTT Timeout" 				 onInput={this.handleInputChange} value={this.state.settings.MQTTTIMEOUT} /></List.Item>
						<List.Item><label for="MQTTSSL">SSL: </label><Checkbox name="MQTTSSL" 		 onChange={this.handleInputChange} checked={this.state.settings.MQTTSSL} /></List.Item>
						<List.Item><Button ripple={true} primary={true} raised={true} onClick={()=>{stateToStorage(this)}}>Save</Button></List.Item>
					</list>
				</Formfield>
			</div>
		);
	}
}

function storageToState(storage, state){
	state.setState({settings: storage})
}

function stateToStorage(state){
	localforage.setItem('MQTTSETTINGS', state.state.settings).then(function(value) {
    window.snackbar.MDComponent.show({message: "Settings Saved!", actionText: "Dismiss", actionHandler: ()=>{}});
	}).catch(function(err) {
    console.log(err);
	});
}
