const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.static('public'));
const five = require('johnny-five');
app.set('view engine', 'hbs');


var scores = [0,0,0,0,0,0,0,0];
var buttons = ['A', 'B', 'L', 'R', 'Down', 'Up', 'Start', 'Select'];


var colors = [];
for (var i = 0; i < 8; i++) {
    colors.push({r:16,g:64,b:96});
}

app.get('/', function (req, res) {
    res.render('index', {colors: colors});
});


io.on('connection', function (socket) {
    socket.on('A', function () {
        scores[0]++;
        colors[0].r +=2;
        colors[0].g -=2;
        io.sockets.emit('color', {button: "A", color: "rgb("+colors[0].r+","+colors[0].g+","+colors[0].b+")"});
    });

    socket.on('B', function () {
        scores[1]++;
        colors[1].r +=2;
        colors[1].g -=2;
        io.sockets.emit('color', {button: "B", color: "rgb("+colors[1].r+","+colors[1].g+","+colors[1].b+")"});
    });

    socket.on('left', function () {
        scores[2]++;
        colors[2].r +=2;
        colors[2].g -=2;
        io.sockets.emit('color', {button: "left", color: "rgb("+colors[2].r+","+colors[2].g+","+colors[2].b+")"});
    });

    socket.on('right', function () {
        scores[3]++;
        colors[3].r +=2;
        colors[3].g -=2;
        io.sockets.emit('color', {button: "right", color: "rgb("+colors[3].r+","+colors[3].g+","+colors[3].b+")"});
    });

    socket.on('down', function () {
        scores[4]++;
        colors[4].r +=2;
        colors[4].g -=2;
        io.sockets.emit('color', {button: "down", color: "rgb("+colors[4].r+","+colors[4].g+","+colors[4].b+")"});
    });

    socket.on('up', function () {
        scores[5]++;
        colors[5].r +=2;
        colors[5].g -=2;
        io.sockets.emit('color', {button: "up", color: "rgb("+colors[5].r+","+colors[5].g+","+colors[5].b+")"});
    });

    socket.on('start', function () {
        scores[6]++;
        colors[6].r +=2;
        colors[6].g -=2;
        io.sockets.emit('color', {button: "start", color: "rgb("+colors[6].r+","+colors[6].g+","+colors[6].b+")"});
    });

    socket.on('select', function () {
        scores[7]++;
        colors[7].r +=2;
        colors[7].g -=2;
        io.sockets.emit('color', {button: "select", color: "rgb("+colors[7].r+","+colors[7].g+","+colors[7].b+")"});
    });

});

setInterval(pressButton, 10000);

function pressButton() {
    var max = [];
    var maxVal = 0;
    var maxInd = 0;
    console.log(scores);
    for (var i = 0; i < scores.length; i++) {
        if (scores[i] > maxVal) {
            maxVal = scores[i];
            maxInd = i;
            max = [];
            max.push(maxInd);
        }
        else if (scores[i] == maxVal) {
            max.push(i);
        }
        scores[i] = 0;
        colors[i].r = 16;
        colors[i].g = 64;
    }
    var ind = max[Math.floor(Math.random() * max.length)];
    var push = buttons[ind];
    if (maxVal == 0) {
        push = null;
    }

    console.log(push);
    console.log();

    io.sockets.emit("reset color", {color: "rgb(16,64,96)"});
    colors = [];
    for (var i = 0; i < 8; i++) {
        colors.push({r:16,g:64,b:96});
    }

    if (push != null) {
        io.sockets.emit("arduino", push);
    }

}

server.listen(process.env.PORT);