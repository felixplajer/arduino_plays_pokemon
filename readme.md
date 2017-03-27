#Arduino Plays Pokemon

TL;DR: Crowdsource a game of Pokemon on an Arduino-controlled Game Boy via a Node.js site.

Basic Structure:
	- Node.js server keeps track of what's going on and sends out messages to clients (via Socket.IO)
	- Browser client allows viewing of livestream and voting on the next move
	- Node.js client gets messages from server and actually controls the arduino (via Johnny-Five)