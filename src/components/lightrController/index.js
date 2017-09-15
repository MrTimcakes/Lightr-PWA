import localforage from 'localforage';
import MQTT from 'paho-mqtt';

import { h, Component } from 'preact';

import style from './style';

export default class lightrController extends Component {
  constructor() {
    super();
    this.state.devices = [];
  }

  componentDidMount() {
    var that = this;
    window.lightrController = this;
    localforage.getItem('MQTTSETTINGS').then(function(settings) {
      if(settings!=null){
				MQTTConnect(settings);
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
        <ul>
          {
            Object.keys(this.state.devices).map(function(key) {
              return <li onClick={()=>{toggleLight(this.state.devices[key])}}>{this.state.devices[key]['nickname']} {this.state.devices[key]['status']?"On":"Off"}</li>
            }.bind(this))
          }
        </ul>
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
  console.log(message);
  if(message.destinationName === "lights/all/status"){
    let newDevice = JSON.parse(message.payloadString);
    let tempDevices = window.lightrController.state.devices;

    let alreadyExists = tempDevices.find((o, i) => {
      if (o.MAC === newDevice.MAC) {
          tempDevices[i] = newDevice;
          return true;
      }
    });
    if(!alreadyExists){
      tempDevices.push(newDevice);
    }

    window.lightrController.setState({devices: tempDevices});
  }
}

function MQTTdisconnect(){
  window.MQTTClient.disconnect();
  console.log("Disconnected");
}

function toggleLight(light){
  console.log(light.MAC);
  let message = new Paho.MQTT.Message("t");
  message.destinationName = `lights/${light.MAC}/set`;
  window.MQTTClient.send(message);
}
