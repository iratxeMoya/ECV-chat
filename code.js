
const roomNames = ["iratxe"];
const server = new SillyClient();
server.connect("wss://tamats.com:55000", roomNames[0]);
roomNames.forEach(function (room) {
	addChatRoom(room);
});

server.on_message = function(user_id, dataStr) {
	const data = JSON.parse(dataStr);
	const user = data.user;
	const message = data.msg;
	sendMsg(message, user, false);
}

server.on_user_connected = function(user_id) {
	notifyStatusChange("newConection", user_id);
}

server.on_user_disconnected = function(user_id) {
	notifyStatusChange("newDisconection", user_id);
}

function addChatRoom (room) {
	const chatRoomContainer = document.createElement("div");
	const roomName = document.createElement("span");
	const parent = document.querySelector(".chatListContainer");
	const numClients = document.createElement("span");
	numClients.classList.add("roomNumCli");

	numClients.innerHTML = server.num_clients;
	roomName.innerHTML = room;
	roomName.style["text-transform"] = "capitalize";
	room === roomNames[0] ? chatRoomContainer.classList.add("selected") : null;
	chatRoomContainer.classList.add("chatRoomContainer");

	chatRoomContainer.appendChild(roomName);
	// chatRoomContainer.appendChild(numClients);
	parent.appendChild(chatRoomContainer);
}

const bots = [
	{name: "Anna", link: "a1.jfif", color: "#165FB4"},
	{name: "Marc", link: "a2.jfif", color: "#6616B4"},
	{name: "John", link: "a3.jfif", color: "#B416B4"},
	{name: "Mike", link: "a4.jfif", color: "#B4165B"},
	{name: "Tony", link: "a5.jfif", color: "#A6B416"}
]
const users = createBots();
const me = new User("Iratxe", "MyAvatar.png", "#C907B4");

const button = document.querySelector("button#send");
button.addEventListener("click", onSendClick);

const input = document.querySelector("input#writeMsg");
input.addEventListener("keydown", onKeyPressed);
input.focus();

const addBtn = document.querySelector("button#add");
addBtn.addEventListener("click", onAddClick);


function Message (user, text){
	this.user = user;
	this.msg = text;
}

function User (name, avatar, color, visualName) {
	this.name = name;
	this.avatar = avatar;
	this.color = color;
}

function onChatRoomClick () {

}

function onAddClick () {
	const name = document.querySelector("input#addInput");
	roomNames.push(name.value);
	addChatRoom(name.value);
}

function notifyStatusChange (status, user) {
	if (status === 'newConection') {
		const message = document.createElement("span");
		const container = document.createElement("div");
		const parent = document.querySelector("div.messageContainer");

		container.classList.add("notificationContainer");
		message.classList.add("notification");
		message.innerHTML = "New user has been conected";

		container.appendChild(message);
		parent.appendChild(container);
	} else if ( status === "newDisconection") {
		const message = document.createElement("span");
		const container = document.createElement("div");
		const parent = document.querySelector("div.messageContainer");

		container.classList.add("notificationContainer");
		message.classList.add("notification");
		message.innerHTML = "New user has been disconected";

		container.appendChild(message);
		parent.appendChild(container);
	}
}

function createBots () {
	const users = bots.map(function (bot) {
		const user = new User(bot.name, bot.link, bot.color);
		return user;
	});

	return users;
}

function onKeyPressed (event) {
	
	if(event.code === "Enter") {
		onSendClick();
	}
	return;
	
}

function onSendClick (){
	
	let text = input.value;
	sendMsg(text, me, true );
	const message = new Message(me, text);
	const messageStr = JSON.stringify(message);
	server.sendMessage(messageStr);
	input.value = "";

}

function sendMsg (msg, user, isMe) {
	
	if(msg === ""){
		return;
	}
	
	const message = document.createElement("p");
	message.classList.add("msg");
	isMe ? message.classList.add("me") : null;
	
	const nameAndMsg = document.createElement("span");
	nameAndMsg.id = "nameAndMsg";
	
	const text = document.createElement("span");
	text.innerHTML = msg;
	text.classList.add("text");
	isMe ? text.classList.add("me") : null;
	
	const image = document.createElement("IMG");
	image.setAttribute("src", user.avatar);
	image.setAttribute("alt", "Avatar");
	image.classList.add("avatar");
	
	const name = document.createElement("span");
	name.id = "name";
	name.style["color"] = user.color;
	name.innerHTML = isMe ? "Me" : user.name;
	
	if (isMe) {
		/* message.appendChild(text);
		message.appendChild(image); */
		const group = document.createElement("div");
		group.classList.add("group");
		nameAndMsg.appendChild(name);
		nameAndMsg.appendChild(text);
		group.appendChild(nameAndMsg);
		group.appendChild(image);
		message.appendChild(group);
	} else {
		message.appendChild(image);
		nameAndMsg.appendChild(name);
		nameAndMsg.appendChild(text);
		message.appendChild(nameAndMsg);
	}
	
	const parent = document.querySelector("div.messageContainer");
	parent.appendChild(message);

	const messageContainer = document.querySelector("div.messageContainer");
	messageContainer.scrollTop = messageContainer.scrollHeight;	
	
}

function botMsg () {
	
	const index = getRandomInt(0, 4);
	const user = users[index];
	
	sendMsg("Hello, I'm a bot", user, false);
	
}
// window.setInterval(botMsg, 5000);

// some random functions for bots

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}