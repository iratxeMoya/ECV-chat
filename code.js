
const button = document.querySelector("button#send");
button.addEventListener("click", onSendClick);

const input = document.querySelector("input#writeMsg");
input.addEventListener("keydown", onKeyPressed);

function onKeyPressed (event) {
	
	if(event.code === "Enter") {
		onSendClick();
	}
	return;
	
}

function onSendClick (){
	
	let text = input.value;
	sendMsg(text);
	input.value = "";
	
}

function sendMsg (msg) {
	
	const message = document.createElement("p");
	message.className = "msg me";
	
	const element = document.createElement("span");
	element.innerHTML = msg;
	element.classList.add("text");
	element.classList.add("me");
	
	message.appendChild(element);
	
	var image = document.createElement("IMG");
	image.setAttribute("src", "myAvatar.png");
	image.setAttribute("alt", "Avatar");
	image.classList.add("avatar");
	message.appendChild(image);
	
	const parent = document.querySelector("div.messageContainer");
	parent.appendChild(message);
	
}