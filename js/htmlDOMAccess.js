
// DOM Access

const myProfileAvatar = document.querySelector("label.gridItem1");
myProfileAvatar.addEventListener("click", onMyAvatarClick);

const button = document.querySelector("button#send");
button.addEventListener("click", onSendClick);

const input = document.querySelector("input#writeMsg");
input.addEventListener("keydown", onKeyPressed);
input.focus();

const addBtn = document.querySelector("button#add");
addBtn.addEventListener("click", onAddClick);

const addInput = document.querySelector("input#addInput");
addInput.addEventListener("keydown", onKeyDownAdd);

const name = document.querySelector("input#writeName");
name.addEventListener("keydown", onKeyDownSelect);

const buttonSelect = document.querySelector("button#select");
buttonSelect.addEventListener("click", onSelectClick);

const profile = document.querySelector("span#profile");
profile.addEventListener("click", onProfileClick);

const chat = document.querySelector("span#chat");
chat.addEventListener("click", onChatClick);

const chatRoomName = document.querySelector("span.chatRoomTitle");
chatRoomName.innerHTML = actualRoom;

// Functions

function onMyAvatarClick () {

	const envelop = document.createElement("div");
	envelop.id = "myDropdown";
	envelop.classList.add("dropdown-content");

	possibleAvatars.forEach(function(avatar) {
		const child = document.createElement("img");
		child.src = avatar;
		child.classList.add("avatar");

		envelop.appendChild(child);
	});

	const parent = myProfileAvatar;
	parent.appendChild(envelop);

	document.getElementById("myDropdown").classList.toggle("show");
	possibleAvatarsDOM = document.querySelectorAll("div#myDropdown img");
	possibleAvatarsDOM.forEach(function(avatar) {
		avatar.addEventListener("click", onAvatarClick)
	})
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
	const message = new Message(me, text, true, 'msg');
	const chatRoom = server.room;
	roomNames.forEach(function(room) {
		if (room.name === chatRoom.name) {
			room.messages.push(message);
		}
	})
	const messageStr = JSON.stringify(message);
	server.sendMessage(messageStr);
	input.value = "";

	return;

}

function onKeyDownAdd (event) {
	if(event.code === "Enter") {
		onAddClick();
	}
}

function onAddClick () {
	const name = document.querySelector("input#addInput");
	const newChatRoom = {name: name.value, messages: []};
	roomNames.push(newChatRoom);
	addChatRoom(name.value);
	name.value = "";
}

function onKeyDownSelect (event) {
	if(event.code === "Enter") {
		onSelectClick();
	}
}

function onSelectClick () {
	myName = name.value;
	me = new User(myName, myAvatar, myColor);
	const chatRoomTitle = document.querySelector("span.title");
	chatRoomTitle.innerHTML = "[" + myName + "] chat rooms"
	name.value = ""
}

function onProfileClick () {
	const chatCont = document.querySelector("div.chat");
	chatCont.style["display"] = "none";

	const profileCont = document.querySelector("div.profilePage");
	profileCont.style["display"] = "block";

	profile.style["background-color"] = "#9b4dca";
	chat.style["background-color"] = "#4f4f4f";
	selectedPage = 'profile';
}

function onChatClick () {
	const chatCont = document.querySelector("div.chat");
	chatCont.style["display"] = "block";

	const profileCont = document.querySelector("div.profilePage");
	profileCont.style["display"] = "none";
	const chat = document.querySelector("span#chat");
	chat.style["background-color"] = "#9b4dca";
	const profile = document.querySelector("span#profile");
	profile.style["background-color"] = "#4f4f4f";
	selectedPage = "chat";
}