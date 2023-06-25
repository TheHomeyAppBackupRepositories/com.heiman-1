'use strict';

const ZwaveDevice = require('homey-zwavedriver').ZwaveDevice;

class SirenDevice extends ZwaveDevice {

	async onMeshInit() {

		// print the node's info to the console
		//this.printNode();

		// enable debugging
		//this.enableDebug();

		this.registerCapability('onoff', 'SWITCH_BINARY');

		this.registerCapability('measure_battery', 'BATTERY');

	}
}

module.exports = SirenDevice;
