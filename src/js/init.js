
// Some global variables

let roomNames = [{name: "defaultRoom", messages: [], connectedUsers: []}];
let actualRoom = "defaultRoom";
let selectedPage = "profile";
let myName = "Unknown";
let myAvatar = "../images/unknown.jpg";
let myColor = "#C907B4";
const possibleAvatars = ["../images/myAvatar.png", "../images/a1.jfif", "../images/a2.jfif", "../images/a3.jfif", "../images/a4.jfif", "../images/a5.jfif"];
let possibleAvatarsDOM = null;
let myID = null;
let me = new User(myName, myAvatar, myColor);
new EmojiPicker();

// Classes

function Message (user, text, isMe, type, isBackup = false){
	this.type = type;
	this.user = user;
	this.msg = text;
	this.isMe = isMe;
	this.isBackup = isBackup;
}

function User (name, avatar, color) {
	this.name = name;
	this.avatar = avatar;
	this.color = color;
}
