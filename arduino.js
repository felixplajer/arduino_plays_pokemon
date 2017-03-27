var io = require('socket.io-client');
var socket = io.connect('https://arduino-plays-pokemon.herokuapp.com/', {reconnect: true});

var five = require('johnny-five');


var board = new five.Board({
     repl:false
});

board.on('ready', function () {

    var servos = {
        ab: new five.Servo({
         pin: 3,
         center: true
        }),
        downright: new five.Servo({
         pin: 5,
         center: true
        }),
        upleft: new five.Servo({
         pin: 9,
         center: true
        }),
        startselect: new five.Servo({
         pin: 11,
         center: true
        })
    };

    socket.on("arduino", function(msg) {
        console.log("got it: " + msg);
        switch(msg) {
            case 'A':
                servos['ab'].to(140);
                setTimeout(function() {
                    servos['ab'].center();
                }, 500);
                break;
            case 'B':
                servos['ab'].to(40);
                setTimeout(function() {
                    servos['ab'].center();
                }, 500);
                break;
            case 'L':
                servos['upleft'].to(140);
                setTimeout(function() {
                    servos['upleft'].center();
                }, 400);
                break;
            case 'R':
                servos['downright'].to(150);
                setTimeout(function() {
                    servos['downright'].center();
                }, 400);
                break;
            case 'Down':
                servos['downright'].to(35);
                setTimeout(function() {
                    servos['downright'].center();
                }, 400);
                break;
            case 'Up':
                servos['upleft'].to(40);
                setTimeout(function() {
                    servos['upleft'].center();
                }, 400);
                break;
            case 'Start':
                servos['startselect'].to(150);
                setTimeout(function() {
                    servos['startselect'].center();
                }, 500);
                break;
            case 'Select':
                servos['startselect'].to(50);
                setTimeout(function() {
                    servos['startselect'].center();
                }, 500);
                break;
        }
    });
});

// socket.on("arduino", function(msg) {
//         console.log("got it: " + msg);
// });