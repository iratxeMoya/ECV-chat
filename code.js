
const roomNames = [{name: "iratxe_room", messages: []}];
let actualRoom = "iratxe_room";
const server = new SillyClient();
let connectedPeople = [];
let selectedPage = "chat";
let myName = "Unknown";
let myAvatar = "unknown.jpg";
let myColor = "#C907B4";

const possibleAvatars = ["myAvatar.png", "a1.jfif", "a2.jfif", "a3.jfif", "a4.jfif", "a5.jfif"]

let myID = null;
server.connect("wss://tamats.com:55000", roomNames[0].name);

server.on_ready = function(id) {
	myID = id;
	
}

roomNames.forEach(function (room) {
	addChatRoom(room.name);
});

server.on_message = function(user_id, dataStr) {
	const data = JSON.parse(dataStr);
	const user = data.user;
	const message = data.msg;
	sendMsg(message, user, false);
	const chatRoom = server.room;
	roomNames.forEach(function(room) {
		if (room.name === chatRoom.name) {
			data.isMe = false;
			room.messages.push(data);
		}
	})
}

server.on_room_info = function(info) {
	connectedPeople = info.clients;
}

server.on_user_connected = function(user_id) {
	notifyStatusChange("newConection", user_id);
	const minID = Array.min(connectedPeople);
	if (Number(myID) === minID) {
		roomNames.forEach(function(room) {
			if (actualRoom === room.name) {
				room.messages.forEach(function(message) {
					const messageStr = JSON.stringify(message);
					server.sendMessage(messageStr, [user_id])
				})
			}
		})
	}

	connectedPeople.push(user_id);
}

server.on_user_disconnected = function(user_id) {
	notifyStatusChange("newDisconection", user_id);
	connectedPeople.splice( connectedPeople.indexOf(user_id), 1 );
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
	room === roomNames[0].name ? chatRoomContainer.classList.add("selected") : null;
	chatRoomContainer.classList.add("chatRoomContainer");

	chatRoomContainer.appendChild(roomName);
	parent.appendChild(chatRoomContainer);

	chatRoomContainer.addEventListener("click", function(){onChatRoomClick(chatRoomContainer)})
}

const bots = [
	{name: "Anna", link: "a1.jfif", color: "#165FB4"},
	{name: "Marc", link: "a2.jfif", color: "#6616B4"},
	{name: "John", link: "a3.jfif", color: "#B416B4"},
	{name: "Mike", link: "a4.jfif", color: "#B4165B"},
	{name: "Tony", link: "a5.jfif", color: "#A6B416"}
]
const users = createBots();
let me = new User(myName, myAvatar, myColor);

const myProfileAvatar = document.querySelector("label.gridItem1");
myProfileAvatar.addEventListener("click", onMyAvatarClick);

let possibleAvatarsDOM = null;

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

const colorPicker = document.querySelector("input#colorPicker");
colorPicker.addEventListener("change", onColorChange);


function Message (user, text, isMe){
	this.user = user;
	this.msg = text;
	this.isMe = isMe
}

function User (name, avatar, color) {
	this.name = name;
	this.avatar = avatar;
	this.color = color;
}

function onAvatarClick () {
	myAvatar = this.src;
	me = new User(myName, myAvatar, myColor);
	let avatar = document.querySelector("img#myAvatar");
	avatar.src = this.src;

	avatar = document.querySelector("label img#myAvatar");
	avatar.src = this.src;
}

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
	console.log(possibleAvatarsDOM)
	possibleAvatarsDOM.forEach(function(avatar) {
		avatar.addEventListener("click", onAvatarClick)
	})
}

function onColorChange () {
	myColor = colorPicker.value;
	me = new User(myName, myAvatar, myColor);
	let avatar = document.querySelector("img#myAvatar");
	avatar.style["background-color"] = myColor;
	avatar = document.querySelector("label img#myAvatar");
	avatar.style["background-color"] = myColor;
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
}

function onChatClick () {
	const chatCont = document.querySelector("div.chat");
	chatCont.style["display"] = "block";

	const profileCont = document.querySelector("div.profilePage");
	profileCont.style["display"] = "none";
	chat.style["background-color"] = "#9b4dca";
	profile.style["background-color"] = "#4f4f4f";
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
	const admin = new User("Administrator", "admin.jfif", "black");
	sendMsg("Welcome to the chat", admin, false);
	roomNames.forEach(function(room) {
		if (room.name === roomName) {
			room.messages.forEach(function(message) {
				sendMsg(message.msg, message.user, message.isMe);
			})
		}
	})
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
	const message = new Message(me, text, true);
	const chatRoom = server.room;
	roomNames.forEach(function(room) {
		if (room.name === chatRoom.name) {
			room.messages.push(message);
		}
	})
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

// utils

Array.min = function( array ){
    return Math.min.apply( Math, array );
};

// BOTS

words = {"1":["a"],
"2":["de","en","si","no","tu","ex","su","la","mi","el"],
"3":["cum","dis","dui","est","hac","leo","mus","nam","nec","non","per","sed","sem","sit","vel"],
"4":["amet","anam","ante","arcu","cras","diam","duis","eget","elit","enim","erat","eros","nibh","nisi","nisl","nunc","odio","orci","quam","quis","urna"],
"5":["augue","class","curae","dolor","donec","etiam","fames","felis","fusce","ipsum","justo","lacus","lorem","magna","massa","metus","morbi","neque","netus","nulla","porta","proin","purus","risus","velit","vitae"],
"6":["aenean","aptent","auctor","congue","cursus","dictum","lectus","libero","ligula","litora","luctus","magnis","mattis","mauris","mollis","montes","nostra","nullam","ornare","platea","primis","rutrum","sapien","semper","sociis","taciti","tellus","tempor","tempus","tortor","turpis","varius"],
"7":["aliquam","aliquet","blandit","commodo","conubia","cubilia","dapibus","egestas","etmorbi","euismod","felisin","feugiat","finibus","gravida","iaculis","integer","lacinia","laoreet","maximus","natoque","posuere","pretium","quisque","rhoncus","sodales","vivamus","viverra"],
"8":["accumsan","bibendum","dictumst","eleifend","estdonec","facilisi","faucibus","habitant","inceptos","interdum","lobortis","maecenas","mattisin","molestie","nascetur","pharetra","placerat","praesent","pulvinar","sagittis","senectus","sociosqu","suscipit","torquent","ultrices","vehicula","volutpat"],
"9":["aliquetin","consequat","convallis","curabitur","dignissim","efficitur","elementum","facilisis","fermentum","fringilla","habitasse","hendrerit","himenaeos","imperdiet","malesuada","nisimorbi","penatibus","phasellus","porttitor","ridiculus","tincidunt","tristique","ultricies","venenatis","vulputate"],
"10":["adipiscing","parturient","potentised","semaliquam","vestibulum"],
"11":["condimentum","consectetur","dictumdonec","feugiatduis","luctusdonec","quaminteger","scelerisque","suspendisse","turpisdonec","ullamcorper"],
"12":["arcumaecenas","egestasetiam","iaculisetiam","ligulamauris","pellentesque","sollicitudin"],
"13":["consequatduis","hendreritduis"],
"14":["convallisproin"],
"15":["purusvestibulum","vestibulumdonec"],
"16":["odiopellentesque"]};



function botMsg (responseLength) {
	
	const index = getRandomInt(0, 4);
	const user = users[index];
	var numChars, selectedWord, response = "";

	responseLength = responseLength ? responseLength : 5;

	while (responseLength > 0) {
		// pick a word, but don't repeat the last one!
		do {
			numChars = wordLengthByFrequency();
			selectedWord = Math.floor(Math.random() * words[numChars].length);
		}
		while (words[numChars][selectedWord] == response.split(" ").pop().toLowerCase());

		// Capitalize first word only
		if (!response)
			response = capitalizeWord(words[numChars][selectedWord]);
		else
			response += words[numChars][selectedWord];

		responseLength--;

		// last word? add punctuation, if not add a space
		response += (responseLength === 0) ? getPunctuation() : " ";
	}
	
	sendMsg(response, user, false);
	const message = new Message(user, response, false);
	const messageStr = JSON.stringify(message);
	server.sendMessage(messageStr);
	
}

function capitalizeWord(word) {
	return  word.charAt(0).toUpperCase() + word.slice(1);
}
function wordLengthByFrequency() {
	var rndm,  // a random number between 1-100
		dist,  // the distribution (in %) of the frequency of word lengths
		i,     // loop counter
		limit; // upper range limit for test

	rndm = Math.floor(Math.random() * 100);
	dist = [5, 7, 9, 13, 20, 13, 9, 5, 4, 4, 3, 2, 2, 2, 1, 1];

	for (i = 0, limit = 0; i < 16; i++) {
		limit += dist[i];
		if (rndm <= limit) {
			return ++i;
		}
	}
}
function getPunctuation() {
	var mark = Math.ceil(Math.random() * 10);

	if (mark == 9)
		return '?';
	else if (mark == 10)
		return '!';
	else
		return '.';
}

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

// window.setInterval(botMsg, 5000);