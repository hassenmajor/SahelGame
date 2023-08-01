
var corps = [];
var tete;
var cible;
var sens;
var sensSuivant = [];

var grille = document.getElementsByClassName("case");
function point(x, y) {
	return grille[x+20*y];
}
function point(t) {
	x = t[0];
	y = t[1];
	if (x<0)
		x=19;
	else if (x>19)
		x=0;
	if (y<0)
		y=19;
	else if (y>19)
		y=0;
	t[0] = x;
	t[1] = y;
	return grille[x+20*y];
}

function apparition() {
	distance = parseInt(Math.random()*20);
	sens = parseInt(Math.random()*4);
	if (sens==0) {
		x=distance;
		y=0;
	}
	else if (sens==1) {
		x=19;
		y=distance;
	}
	else if (sens==2) {
		x=distance;
		y=19;
	}
	else if (sens==3) {
		x=0;
		y=distance;
	}
	tete = [x,y];
	corps.push(tete);
	point(tete).style.background = "orange";
	mouvementPoint(tete);
	corps.push(tete);
	point(tete).style.background = "orange";
}
apparition();

function initialiserCible() {
	x = parseInt(Math.random()*20);
	y = parseInt(Math.random()*20);
	cible = [x,y];
	if (point(cible).style.background=="orange")
		initialiserCible();
	else
		point(cible).style.background = "red";
}
initialiserCible();

function mouvementPoint(tete) {
	x = tete[0];
	y = tete[1];
	if (sens==0)
		y++;
	else if (sens==1)
		x++;
	else if (sens==2)
		y--;
	else if (sens==3)
		x--;
	return [x,y]
}
function mouvement() {
	point(corps.shift()).style.background = "";
	if (sensSuivant.length>0)
		sens = sensSuivant.shift();
	tete = mouvementPoint(tete);
	if (point(tete).style.background == "orange") {
		point(tete).style.background = "grey";
		return;
	}
	corps.push(tete);
	point(tete).style.background = "orange";
	actualiserCible();
	setTimeout(function() { mouvement() }, 200);
}
mouvement();

function changerSens(bouton) {
	switch ("Arrow"+bouton.id) {
		case "ArrowDown":
			sensNouveau = 0;
			break;
		case "ArrowRight":
			sensNouveau = 1;
			break;
		case "ArrowUp":
			sensNouveau = 2;
			break;
		case "ArrowLeft":
			sensNouveau = 3;
			break;
	}
	if (sensNouveau%2!=sens%2)
		sensSuivant.push(sensNouveau);
}
function actualiserCible() {
	if (tete[0]==cible[0] && tete[1]==cible[1]) {
		corps.push(tete);
		initialiserCible();
	}
}
document.addEventListener("keydown", function(event) {
	switch (event.key) {
		case "ArrowDown":
			sensNouveau = 0;
			break;
		case "ArrowRight":
			sensNouveau = 1;
			break;
		case "ArrowUp":
			sensNouveau = 2;
			break;
		case "ArrowLeft":
			sensNouveau = 3;
			break;
	}
	if (sensNouveau%2!=sens%2)
		sensSuivant.push(sensNouveau);
});
