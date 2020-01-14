
const button = document.querySelector("button#send");
button.addEventListener("click", onSendClick);

const input = document.querySelector("input#writeMsg");
input.addEventListener("keydown", onKeyPressed);

window.setInterval(botMsg, 5000);

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
	name.innerHTML = senderName;
	
	if (isMe) {
		message.appendChild(text);
		message.appendChild(image);
	} else {
		message.appendChild(image);
		nameAndMsg.appendChild(name);
		nameAndMsg.appendChild(text);
		message.appendChild(nameAndMsg);
	}
	
	const parent = document.querySelector("div.messageContainer");
	parent.appendChild(message);
	
}

function botMsg () {
	
	sendMsg("Hello, I'm a bot", "https://i.pravatar.cc/50", false, "Some Bot");
	
}