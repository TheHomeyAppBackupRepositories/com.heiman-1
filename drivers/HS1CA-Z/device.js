'use strict';

const ZwaveDevice = require('homey-zwavedriver').ZwaveDevice;

class SmokeSensorDevice extends ZwaveDevice {

    async onMeshInit() {

        // print the node's info to the console
        //this.printNode();

        // enable debugging
        //this.enableDebug();

        this.registerCapability('measure_battery', 'BATTERY');
        this.registerCapability('alarm_co', 'NOTIFICATION');
    }
}

module.exports = SmokeSensorDevice;
