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
		localforage.getItem('MQTT-SETTINGS').then(function(value) {
			if(value!=null){
				objToForm(value, document.getElementById('settingsForm'));
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
						<List.Item><Textfield name="MQTT-HOST" label="MQTT Host" /></List.Item>
						<List.Item><Textfield name="MQTT-PORT" label="MQTT WebSocket Port" /></List.Item>
						<List.Item><Textfield name="MQTT-CLIENT-PREFIX" label="MQTT Client-Prefix" /></List.Item>
						<List.Item><Textfield name="MQTT-PATH" label="MQTT Path" /></List.Item>
						<List.Item><Textfield name="MQTT-USERNAME" label="MQTT Username" /></List.Item>
						<List.Item><Textfield name="MQTT-PASSWORD" label="MQTT Password" /></List.Item>
						<List.Item><Textfield name="MQTT-KEEP-ALIVE" label="MQTT Keep-Alive" /></List.Item>
						<List.Item><Textfield name="MQTT-TIMEOUT" label="MQTT Timeout" /></List.Item>
						<List.Item><label for="MQTT-SSL">SSL: </label><Checkbox name="MQTT-SSL" checked={true} /></List.Item>
						<List.Item><Button ripple={true} primary={true} raised={true} onClick={saveSettings}>Save</Button></List.Item>
					</list>
				</Formfield>
			</div>
		);
	}
}

function saveSettings(){
	localforage.setItem('MQTT-SETTINGS', formToObj(document.getElementById('settingsForm')) ).then(function(value) {
		console.log("Settings Saved!");
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
