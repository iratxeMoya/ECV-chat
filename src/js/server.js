
// Server

const server = new SillyClient();

server.connect("wss://tamats.com:55000", roomNames[0].name);

server.on_ready = function(id) { myID = id };


server.on_message = function(user_id, dataStr) {

	const data = JSON.parse(dataStr);

	if (data.type == 'msg') {
		console.log("message REcived: ", data);
		const user = data.user;
		const message = data.msg;
		const chatRoom = server.room;
		roomNames.forEach(function(room) {
			if (room.name === chatRoom.name) {
				if (room.messages.length == 0) {
					sendMsg(message, user, false);
					data.isMe = false;
					room.messages.push(data);
				}
			}
		})
	}

}

server.on_room_info = function(info) {
	roomNames.forEach(function(room) {
		if (actualRoom === room.name) {
			room.connectedUsers = info.clients;
		}
	})
}

server.on_user_connected = function(user_id) {
	notifyStatusChange("newConection", user_id);
	let minID = null;
	roomNames.forEach(function(room) {
		if (actualRoom === room.name) {
			minID = Array.min(room.connectedUsers);
		}
	})

	console.log("new user connected. ID: ", user_id, "my ID: ", myID)
	
	if (Number(myID) === minID) {
		roomNames.forEach(function(room) {
			if (actualRoom === room.name) {
				room.messages.forEach(function(message) {
					console.log("messageSended: ", message);
					const messageStr = JSON.stringify(message);
					server.sendMessage(messageStr, [user_id]);
				});
				room.connectedUsers.push(user_id);
			}
		})
	}

}

server.on_user_disconnected = function(user_id) {
	notifyStatusChange("newDisconection", user_id);
	roomNames.forEach(function(room) {
		if (actualRoom === room.name) {
			room.connectedUsers.splice( room.connectedUsers.indexOf(user_id), 1 );
		}
	})
}