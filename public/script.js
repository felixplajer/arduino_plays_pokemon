const socket = io();

function up(){
    socket.emit('up');
}
function right(){
    socket.emit('right');
}
function left(){
    socket.emit('left');
}
function down(){
    socket.emit('down');
}
function a(){
    socket.emit('A');
}
function b(){
    socket.emit('B');
}
function start(){
    socket.emit('start');
}
function select(){
    socket.emit('select');
}

document.getElementById('up').onclick = up;
document.getElementById('right').onclick = right;
document.getElementById('left').onclick = left;
document.getElementById('down').onclick = down;
document.getElementById('A').onclick = a;
document.getElementById('B').onclick = b;
document.getElementById('start').onclick = start;
document.getElementById('select').onclick = select;

socket.on("color", function(msg) {
	document.getElementById(msg.button).style.background = msg.color;
});

socket.on("reset color", function(msg) {
	document.getElementById('up').style.background = msg.color;
	document.getElementById('right').style.background = msg.color;
	document.getElementById('left').style.background = msg.color;
	document.getElementById('down').style.background = msg.color;
	document.getElementById('A').style.background = msg.color;
	document.getElementById('B').style.background = msg.color;
	document.getElementById('start').style.background = msg.color;
	document.getElementById('select').style.background = msg.color;
})