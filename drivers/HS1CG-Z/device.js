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

		//# https://apps.developer.homey.app/upgrade-guides/upgrading-to-sdk-v3
    	//this._flowTriggerGasAlarm = new Homey.FlowCardTriggerDevice('gas_alarm_trigger').register();
		//this._flowTriggerGasAlarmEnde = new Homey.FlowCardTriggerDevice('gas_alarm_ende').register();
		this._flowTriggerGasAlarm = this.homey.trigger.getConditionCard("gas_alarm_trigger").register();
		this._flowTriggerGasAlarmEnde = this.homey.trigger.getConditionCard("gas_alarm_ende").register();

		//# https://apps.developer.homey.app/upgrade-guides/upgrading-to-sdk-v3
		//const gasAlarmCondition = new Homey.FlowCardCondition("is_gasalarm");
		const gasAlarmCondition = this.homey.flow.getConditionCard("is_gasalarm");
		gasAlarmCondition.register().registerRunListener((args, state) => {
			let gasAlarm = args.device.getCapabilityValue('alarm_gas');
			return Promise.resolve(gasAlarm);
		})
	}
}

module.exports = GasSensorDevice;
