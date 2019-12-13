/*!
// Snow.js - v0.0.3
// kurisubrooks.com
*/

// Amount of Snowflakes
var snowMax = 75;

// Snowflake Colours
var snowColor = ["#DDD", "#EEE"];

// Snow Entity
var snowEntity = "&#x2022;";

// Falling Velocity
var snowSpeed = 0.75;

// Minimum Flake Size
var snowMinSize = 20;

// Maximum Flake Size
var snowMaxSize = 50;

// Refresh Rate (in milliseconds)
var snowRefresh = 50;

// Additional Styles
var snowStyles = "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;";

/*
// End of Configuration
// ----------------------------------------
// Do not modify the code below this line
*/

var snow = [],
	pos = [],
	coords = [],
	lefr = [],
	marginBottom,
	marginRight;

function randomise(range) {
	rand = Math.floor(range * Math.random());
	return rand;
}

var lastchristmas = new Audio('1.mp3');

function playAudio() {
    lastchristmas.play();
}

function initSnow() {
	var snowSize = snowMaxSize - snowMinSize;
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth - 15;
	document.getElementById("body").style.backgroundColor = "#A52A2A";
	document.getElementById("txt_search").style.color = "#FFFFFF";
	document.getElementById("txt_exchange").style.color = "#FFFFFF";
	document.getElementById("txt_analyze").style.color = "#FFFFFF";
	document.getElementById("txt_title").style.color = "#FFFFFF";
	document.getElementById("tr").style.color = "#FFFFFF";
	document.getElementById("tr1").style.color = "#FFFFFF";
	document.getElementById("footer").style.backgroundColor = "#8c1b1b";
	document.getElementById("button_snow").className = "btn btn-outline-light";
	document.getElementById("button_exchange").className = "btn btn-outline-light";
	document.getElementById("insta_gira").style.color = "#FFFFFF";
	document.getElementById("insta_vlad").style.color = "#FFFFFF";
	document.getElementById("button").style.backgroundColor = "#8c1b1b";
	document.getElementById("button1").style.backgroundColor = "#8c1b1b";
	document.getElementById("button2").style.backgroundColor = "#8c1b1b";
	document.getElementById("button3").style.backgroundColor = "#8c1b1b";
	document.getElementById("button").style.color = "#FFFFFF";
	document.getElementById("button1").style.color = "#FFFFFF";
	document.getElementById("img_icon").src = "5.png";
	document.getElementById("insta_img").src = "instagram1.png";
	document.getElementById("insta_img1").src = "instagram1.png";
	document.getElementById('last').play();
	//playLast();

	for (i = 0; i <= snowMax; i++) {
		coords[i] = 0;
		lefr[i] = Math.random() * 15;
		pos[i] = 0.03 + Math.random() / 10;
		snow[i] = document.getElementById("flake" + i);
		snow[i].style.fontFamily = "inherit";
		snow[i].size = randomise(snowSize) + snowMinSize;
		snow[i].style.fontSize = snow[i].size + "px";
		snow[i].style.color = snowColor[randomise(snowColor.length)];
		snow[i].style.zIndex = 1000;
		snow[i].sink = snowSpeed * snow[i].size / 5;
		snow[i].posX = randomise(marginRight - snow[i].size);
		snow[i].posY = randomise(2 * marginBottom - marginBottom - 2 * snow[i].size);
		snow[i].style.left = snow[i].posX + "px";
		snow[i].style.top = snow[i].posY + "px";
	}

	moveSnow();
}

function resize() {
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth - 15;
}

function moveSnow() {
	for (i = 0; i <= snowMax; i++) {
		coords[i] += pos[i];
		snow[i].posY += snow[i].sink;
		snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
		snow[i].style.top = snow[i].posY + "px";

		if (snow[i].posY >= marginBottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginRight - 3 * lefr[i])) {
			snow[i].posX = randomise(marginRight - snow[i].size);
			snow[i].posY = 0;
		}
	}

	setTimeout("moveSnow()", snowRefresh);
}

for (i = 0; i <= snowMax; i++) {
	document.write("<span id='flake" + i + "' style='" + snowStyles + "position:absolute;top:-" + snowMaxSize + "'>" + snowEntity + "</span>");
}

window.addEventListener('resize', resize);
//window.addEventListener('load', initSnow);
