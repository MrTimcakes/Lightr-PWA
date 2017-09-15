import localforage from 'localforage';
import MQTT from 'paho-mqtt';

import { h, Component } from 'preact';

import style from './style';

export default class lightrController extends Component {
  constructor() {
    super();
    this.state.settings = {};
  }

  componentDidMount() {
    var that = this;
    localforage.getItem('MQTTSETTINGS').then(function(value) {
      if(value!=null){
				MQTTConnect(value);
			}else{
				//Not yet set
			}
		}).catch(function(err) {
			console.log(err);
		});
  }

  componentWillUnmount() {
    MQTTdisconnect();
  }

  render(props, state) {
    return (
			<div class={ style.lightrController }>
				boi
			</div>
		);
  }
}

function MQTTConnect(settings){
  window.MQTTClient = new Paho.MQTT.Client(settings["MQTTHOST"], parseInt(settings["MQTTPORT"], 10), settings["MQTTCLIENTPREFIX"] ? settings["MQTTCLIENTPREFIX"] + Math.random().toString(36).substring(7) : Math.random().toString(36).substring(7));

  window.MQTTClient.onConnectionLost = onConnectionLost;
  window.MQTTClient.onMessageArrived = onMessageArrived;

  window.MQTTClient.connect({
    userName: settings["MQTTUSERNAME"],
    password: settings["MQTTPASSWORD"],
    timeout: settings["MQTTTIMEOUT"],
    keepAliveInterval: settings["MQTTKEEPALIVE"],
    cleanSession: true,
    useSSL: settings["MQTTSSL"],
    onSuccess: onConnect,
    onFailure: onFail
  });
}

function onConnect() {
  console.log("Connected");
  window.MQTTClient.subscribe("lights/all/status")
  let message = new Paho.MQTT.Message("");
  message.destinationName = "lights/all";
  window.MQTTClient.send(message);
}

function onFail() {
  console.log("Failed");
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  console.log("Message: " + message.payloadString);
}

function MQTTdisconnect(){
  window.MQTTClient.disconnect();
  console.log("Disconnected");
}
