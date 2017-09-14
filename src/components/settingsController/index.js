import localforage from 'localforage';

import { h, Component } from 'preact';

import List from 'preact-material-components/List';
import Formfield from 'preact-material-components/Formfield';
import Textfield from 'preact-material-components/Textfield';
import Checkbox from 'preact-material-components/Checkbox';
import Button from 'preact-material-components/Button';

import style from './style';

export default class SettingsController extends Component {
	componentDidMount() {
		localforage.getItem('MQTT-Settings').then(function(value) {
			//console.log(value);
			objToForm(value, document.getElementById('settingsForm'));
		}).catch(function(err) {
			console.log(err);
		});
	}

	render() {
		return (
			<div class={ style.settingsController }>
				<Formfield id="settingsForm">
					<list>
						<List.Item><Textfield name="MQTT-Host" label="MQTT Host" /></List.Item>
						<List.Item><Textfield name="MQTT-Port" label="MQTT WebSocket Port" /></List.Item>
						<List.Item><Textfield name="MQTT-Client-Prefix" label="MQTT Client-Prefix" /></List.Item>
						<List.Item><Textfield name="MQTT-Path" label="MQTT Path" /></List.Item>
						<List.Item><Textfield name="MQTT-Username" label="MQTT Username" /></List.Item>
						<List.Item><Textfield name="MQTT-Password" label="MQTT Password" /></List.Item>
						<List.Item><Textfield name="MQTT-Keep-Alive" label="MQTT Keep-Alive" /></List.Item>
						<List.Item><Textfield name="MQTT-Timeout" label="MQTT Timeout" /></List.Item>
						<List.Item><label for="MQTT-SSL">SSL: </label><Checkbox name="MQTT-SSL" checked={true} /></List.Item>
						<List.Item><Button ripple={true} primary={true} raised={true} onClick={saveSettings}>Save</Button></List.Item>
					</list>
				</Formfield>
			</div>
		);
	}
}

function saveSettings(){
	localforage.setItem('MQTT-Settings', formToObj(document.getElementById('settingsForm')) ).then(function(value) {
		// Success
	}).catch(function(err){
    console.log(err);
	})
}

function formToObj(form){
	var obj = {};
	var elements = form.querySelectorAll( "input, select, textarea" );
	for(var i = 0; i < elements.length; i++){
		if(elements[i].name){
			obj[ elements[i].name ] = elements[i].value;
		}
	}
	return obj;
}

function objToForm(data, form){
	var elements = form.querySelectorAll( "input, select, textarea" );
	for(var i = 0; i < elements.length; i++){
		if(data[elements[i].name]){
			elements[i].value = data[elements[i].name];
		}
	}
}
