var socket = require('socket.io');

console.log("socket obj file reached");
//var room;

//var io = require('socket.io')(server);
var socketObject = {
    init : function(server) {
		socketObject.io = socket(server);
		
		socketObject.getInstance().on('connection', function(client){
			console.log('a user connected to socket');
			/*socketObject.socketID = client.id;*/
			client
				.on('joinRoom', function(data){
				console.log('user joined board/room: (' + typeof data.boardID + ") " + data.boardID);
				client.join(data.boardID);

				let rooms = Object.keys(client.rooms);
				socketObject.room = data.boardID;
			})
				.on('debug', function(data){
					console.log(data);
				})
				.on('disconnect', function(){
				console.log('user disconnected from socket');
			});
		});
    },
	getInstance : function(){
		console.log("Socket requested");
		return socketObject.io;
	},
	getRoom: function(){
		return socketObject.room;
	}
	/*,
	getID: function(){
		return socketObject.socketID; //used for broadcast
	}*/
};

module.exports = socketObject;