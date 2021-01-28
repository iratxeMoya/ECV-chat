
//Chat

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
		message.innerHTML = "A user has been disconected";

		container.appendChild(message);
		parent.appendChild(container);
	}
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