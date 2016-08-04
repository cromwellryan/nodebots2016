var five = require("johnny-five");
var Particle = require('particle-io');
var board = new five.Board({
     io: new Particle({
       token: '8c461c53e385172408e430ff2be8a4919b0d232a',
       deviceName: 'nodebots7',
     })
   });

board.on("ready", function() {
 var led = new five.Led('D7');
 led.blink(500);
});
