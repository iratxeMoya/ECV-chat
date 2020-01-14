// Server Conection

const server = new SillyClient();
server.connect("wss://tamats.com:55000", "iratxe");

server.on_message = function(user_id, message) {
	const user = new User(user_id, "https://i.pravatar.cc/50", getRandomColor());
	sendMsg(message, user, false);
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }
// Client side
const bots = [
	{name: "Anna", link: "a1.jfif", color: "#165FB4"},
	{name: "Marc", link: "a2.jfif", color: "#6616B4"},
	{name: "John", link: "a3.jfif", color: "#B416B4"},
	{name: "Mike", link: "a4.jfif", color: "#B4165B"},
	{name: "Tony", link: "a5.jfif", color: "#A6B416"}
]
const users = createBots();
const me = new User("Me", "MyAvatar.png", "black");

const button = document.querySelector("button#send");
button.addEventListener("click", onSendClick);

const input = document.querySelector("input#writeMsg");
input.addEventListener("keydown", onKeyPressed);
input.focus();

function User (name, avatar, color) {
	this.name = name;
	this.avatar = avatar;
	this.color = color;
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
	server.sendMessage(text);
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
	name.innerHTML = user.name;
	
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

function getRandomInt(min, max) {
	min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function botMsg () {
	
	const index = getRandomInt(0, 4);
	const user = users[index];
	
	sendMsg("Hello, I'm a bot", user, false);
	
}
// window.setInterval(botMsg, 5000);

