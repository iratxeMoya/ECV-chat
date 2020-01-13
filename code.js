
const button = document.querySelector("button#send");
button.addEventListener("click", onSendClick);

const input = document.querySelector("input#writeMsg");
input.addEventListener("keydown", onKeyPressed);

setTimeout(botMsg, 5000);

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

function sendMsg (msg, imageName, isMe) {
	
	const message = document.createElement("p");
	message.classList.add("msg");
	isMe ? message.classList.add("me") : null;
	
	const element = document.createElement("span");
	element.innerHTML = msg;
	element.classList.add("text");
	isMe ? element.classList.add("me") : null;
	
	var image = document.createElement("IMG");
	image.setAttribute("src", imageName);
	image.setAttribute("alt", "Avatar");
	image.classList.add("avatar");
	
	if (isMe) {
		message.appendChild(element);
		message.appendChild(image);
	} else {
		message.appendChild(image);
		message.appendChild(element);
	}
	
	const parent = document.querySelector("div.messageContainer");
	parent.appendChild(message);
	
}

function botMsg () {
	
	sendMsg("Hello, I'm a bot", "https://i.pravatar.cc/50", false);
	
}