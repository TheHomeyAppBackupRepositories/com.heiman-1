'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-zwavedriver').ZwaveDevice;

class GasSensorDevice extends ZwaveDevice {

	async onMeshInit() {

		// print the node's info to the console
		//this.printNode();

		// enable debugging
		//this.enableDebug();

		this.registerCapability('alarm_gas', 'NOTIFICATION', {
			report: 'NOTIFICATION_REPORT',
			reportParser: report => {
				if (report && report['Notification Type'] === 'Gas Alarm') {


					if (report['Notification Status'] === 'On' && report['Event'] != 0) {
						this._flowTriggerGasAlarm.trigger(this).catch(this.error)
						return true;
					}


					if (report['Notification Status'] === 'On' && report['Event'] == 0) {
						this._flowTriggerGasAlarmEnde.trigger(this).catch(this.error)
						return false;
					}


				}
				return null;
			}
		});

		this._flowTriggerGasAlarm = new Homey.FlowCardTriggerDevice('gas_alarm_trigger').register();
		this._flowTriggerGasAlarmEnde = new Homey.FlowCardTriggerDevice('gas_alarm_ende').register();

		const gasAlarmCondition = new Homey.FlowCardCondition("is_gasalarm");
		gasAlarmCondition.register().registerRunListener((args, state) => {
			let gasAlarm = args.device.getCapabilityValue('alarm_gas');
			return Promise.resolve(gasAlarm);
		})
	}
}

module.exports = GasSensorDevice;
