
// PROFILE MODIFICATION

function onAvatarClick () {
	myAvatar = this.src;
	me = new User(myName, myAvatar, myColor);
	let avatar = document.querySelector("img#myAvatar");
	avatar.src = this.src;

	avatar = document.querySelector("label img#myAvatar");
	avatar.src = this.src;
}

var elem = $('.color-button')[0];
var hueb = new Huebee( elem, {

});

hueb.setColor('#C907B4');

$('.color-button').each( function( i, elem ) {
  var hueb = new Huebee( elem, {

	});
});

hueb.on( 'change', function( color, hue, sat, lum ) {
	onColorChange(color);
});

function onColorChange (value) {
	myColor = value;
	me = new User(myName, myAvatar, myColor);
	let avatar = document.querySelector("img#myAvatar");
	avatar.style["background-color"] = myColor;
	avatar = document.querySelector("label img#myAvatar");
	avatar.style["background-color"] = myColor;
}