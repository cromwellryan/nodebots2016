var five = require("johnny-five");
var Particle = require("particle-io");
var clear = require("cli-clear");

var board = new five.Board({
  io: new Particle({
    token: process.env.PARTICLE_TOKEN,
    deviceName: process.env.PARTICLE_DEVICE_NAME
  })
});

board.on("ready", function() {
  console.log('ready');

  var leftWheelSpeedPin = 'D0';
  var leftWheelDirPin = 'D2';
  var rightWheelSpeedPin = 'D1';
  var rightWheelDirPin = 'D3';

  var rightWheel = new five.Motor({
    pins: { pwm: rightWheelSpeedPin, dir: rightWheelDirPin },
    invertPWM: true
  });

  var leftWheel = new five.Motor({
    pins: { pwm: leftWheelSpeedPin, dir: leftWheelDirPin },
    invertPWM: true
  });

  var speed = 255;
  var turnSpeed = 200;

  function reverse() {
    leftWheel.rev(speed);
    rightWheel.rev(speed);
  }

  function forward() {
    leftWheel.fwd(speed);
    rightWheel.fwd(speed);
  }

  function stop() {
    leftWheel.stop();
    rightWheel.stop();
  }

  function right() {
    leftWheel.rev(turnSpeed);
    rightWheel.fwd(turnSpeed);
  }

  function left() {
    leftWheel.fwd(turnSpeed);
    rightWheel.rev(turnSpeed);
  }

  function exit() {
    console.log('');
    console.log('parking...');

    leftWheel.rev(0);
    rightWheel.rev(0);
    setTimeout(process.exit, 1000);

    console.log('bye');
  }

  var keyMap = {
    'up': { command: forward, instruction: "forward", key: "↑" },
    'down': { command: reverse, instruction: "back", key: "↓" },
    'left': { command: left, instruction: "left", key: "←" },
    'right': { command: right, instruction: "right", key: "→" },
    'space': { command: stop, instruction: "stop", key: "space" },
    'q': { command: exit, instruction: "quit", key: "q" },
  };

  var stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();

  stdin.on("keypress", function(chunk, key) {
      if (!key || !keyMap[key.name]) return;

      keyMap[key.name].command();
  });


  clear();

  for(var prop in keyMap) {
    let key = keyMap[prop].key;
    let instruction = keyMap[prop].instruction;

    console.log(`${key} ${instruction}`);
  }

  console.log('');
  console.log('Drive safe!');
  console.log('');
});
