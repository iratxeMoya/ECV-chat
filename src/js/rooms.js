
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
	const nameAndBtn = document.createElement("div");
	const deleteBtn = document.createElement("button");
	const deleteIcon = document.createElement("i");

	deleteIcon.classList.add("material-icons");
	deleteIcon.classList.add("md-18");
	deleteIcon.innerHTML = "delete";

	deleteBtn.appendChild(deleteIcon);
	deleteBtn.classList.add("deleteBtn");

	nameAndBtn.classList.add("nameAndBtn");

	roomName.innerHTML = room;
	roomName.classList.add("roomName2");
	room === roomNames[0].name ? chatRoomContainer.classList.add("selected") : null;
	chatRoomContainer.classList.add("chatRoomContainer");

	nameAndBtn.appendChild(roomName);
	nameAndBtn.appendChild(deleteBtn);
	chatRoomContainer.appendChild(nameAndBtn);
	parent.appendChild(chatRoomContainer);

	roomName.addEventListener("click", function(){onChatRoomClick(chatRoomContainer)});
	deleteBtn.addEventListener("click", function(){onDeleteRoom(chatRoomContainer)});
}

function onDeleteRoom (room) {

	const child = room.childNodes[0];
	roomName = child.childNodes[0].innerHTML.toLowerCase();

	if (actualRoom != roomName) {
		roomNames = roomNames.filter(function( room ) {
			return room.name !== roomName;
		});
		room.parentNode.removeChild(room);
	} else {
		alert("You can't remove a room if you are in.");
	}

}

function onChatRoomClick (room) {
	const selectedRoom = document.querySelector("div.chatRoomContainer.selected");
	selectedRoom.classList.remove("selected");
	room.classList.add("selected");

	const child = room.childNodes[0];
	roomName = child.childNodes[0].innerHTML;

	server.connect("wss://tamats.com:55000", roomName);
	actualRoom = roomName;

	const parent = document.querySelector("div.messageContainer");
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
	const admin = new User("Administrator", "../images/admin.jfif", "black");
	sendMsg("Welcome to the chat", admin, false, 'msg');

	roomNames.forEach(function(room) {
		if (room.name === roomName) {
			room.messages.forEach(function(message) {
				sendMsg(message.msg, message.user, message.isMe);
			})
		}
	})
	
	const chatRoomName = document.querySelector("span.chatRoomTitle");
	chatRoomName.innerHTML = actualRoom;
}