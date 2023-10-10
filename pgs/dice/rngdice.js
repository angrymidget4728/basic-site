var rand1 = Math.floor(Math.random() * 6) + 1;
var rand2 = Math.floor(Math.random() * 6) + 1;

imgs = document.querySelectorAll("img")

img1Path = "images/dice" + rand1 + ".png";
img2Path = "images/dice" + rand2 + ".png";

imgs[0].setAttribute("src", img1Path)
imgs[1].setAttribute("src", img2Path)

if (rand1 > rand2) {
	document.querySelector("h1").innerHTML = "Player 1 Wins!";
} else if (rand1 < rand2) {
	document.querySelector("h1").innerHTML = "Player 2 Wins!";
} else {
	document.querySelector("h1").innerHTML = "Draw";
}