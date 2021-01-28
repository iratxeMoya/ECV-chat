// utils

Array.min = function( array ){
    return Math.min.apply( Math, array );
};


function capitalizeWord(word) {
	return  word.charAt(0).toUpperCase() + word.slice(1);
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

const hey = "hey";