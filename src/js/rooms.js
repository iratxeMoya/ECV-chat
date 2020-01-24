
// Chat rooms

roomNames.forEach(function (room) {
	addChatRoom(room.name);
});

function addChatRoom (room) {

	if (room == '') {
		return;
	}

	const chatRoomContainer = document.createElement("div");
	const roomName = document.createElement("span");
	const parent = document.querySelector(".chatListContainer");
	const numClients = document.createElement("span");
	numClients.classList.add("roomNumCli");

	numClients.innerHTML = server.num_clients;
	roomName.innerHTML = room;
	room === roomNames[0].name ? chatRoomContainer.classList.add("selected") : null;
	chatRoomContainer.classList.add("chatRoomContainer");

	chatRoomContainer.appendChild(roomName);
	parent.appendChild(chatRoomContainer);

	chatRoomContainer.addEventListener("click", function(){onChatRoomClick(chatRoomContainer)})
}

function onChatRoomClick (room) {
	const selectedRoom = document.querySelector("div.chatRoomContainer.selected");
	selectedRoom.classList.remove("selected");
	room.classList.add("selected");

	const child = room.childNodes[0];
	roomName = child.innerHTML.toLowerCase();

	server.connect("wss://tamats.com:55000", roomName);
	actualRoom = roomName;

	const parent = document.querySelector("div.messageContainer");
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
	const admin = new User("Administrator", "../images/admin.jfif", "black");
	sendMsg("Welcome to the chat", admin, false, 'msg');


	roomNames.forEach(function(room) {
		console.log("in the first for: ", room)
		if (room.name === roomName) {
			room.messages.forEach(function(message) {
				sendMsg(message.msg, message.user, message.isMe);
			})
		}
	})
	
	const chatRoomName = document.querySelector("span.chatRoomTitle");
	chatRoomName.innerHTML = actualRoom;
}