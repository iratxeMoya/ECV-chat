const bots = [
	{name: "Anna", gen: "fem", link: "a1.jfif"},
	{name: "Marc", gen: "masc", link: "a2.jfif"},
	{name: "John", gen: "masc", link: "a3.jfif"},
	{name: "Mike", gen: "masc", link: "a4.jfif"},
	{name: "Tony", gen: "masc", link: "a5.jfif"}
]

const users = createBots();

const button = document.querySelector("button#send");
button.addEventListener("click", onSendClick);

const input = document.querySelector("input#writeMsg");
input.addEventListener("keydown", onKeyPressed);

function User (name, avatar) {
	this.name = name;
	this.avatar = avatar;
}

function createBots () {
	const users = bots.map(function (bot) {
		const user = new User(bot.name, bot.link);
		console.log('bot', bot, user);
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
	sendMsg(text, "myAvatar.png", true);
	input.value = "";
	const messageContainer = document.querySelector("div.messageContainer");
	messageContainer.scrollTop = messageContainer.scrollHeight;	
}

function sendMsg (msg, imageName, isMe, senderName) {
	
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
	image.setAttribute("src", imageName);
	image.setAttribute("alt", "Avatar");
	image.classList.add("avatar");
	
	const name = document.createElement("span");
	name.id = "name";
	name.innerHTML = isMe ? "Me" : senderName;
	
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
	
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function botMsg () {
	
	const index = getRandomInt(0, 4);
	const user = users[index];
	
	console.log("user", users, index);
	
	sendMsg("Hello, I'm a bot", user.avatar, false, user.name);
	
}
//window.setInterval(botMsg, 10000);

botMsg();
botMsg();
botMsg();
botMsg();
botMsg();
botMsg();
botMsg();