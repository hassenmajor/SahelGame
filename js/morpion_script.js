var mouvement = 0;
var verification = false;

const joueur = document.querySelector("#joueur");
const grille = document.getElementsByClassName("case");

function point(x, y) {
	return grille[x+3*y];
}
function position(e) {
	for (const i in grille) {
		if (grille[i]===e)
			return {x: i%3, y: parseInt(i/3)}
	}
}

function action(e) {
	if (e.innerText.length==0 && !verification) {
		mouvement++;
		if (mouvement%2==1) {
			e.innerText = "O";
			joueur.innerText = mouvement==9?"":"Au tour de X";
		}
		else {
			e.innerText = "X";
			joueur.innerText = mouvement==9?"":"Au tour de O";
		}
		verification = verifier(e);
		if (verification) {
			joueur.innerText = "";
			setTimeout(() => {
				victoire(e);
			}, 200);
		}
	}
	// console.log(position(e));
}

function verifier(e) {
	let horizontale = 
		(point(position(e).x, 0).innerText==e.innerText &&
		point(position(e).x, 1).innerText==e.innerText &&
		point(position(e).x, 2).innerText==e.innerText);
	let verticale = 
		(point(0, position(e).y).innerText==e.innerText &&
		point(1, position(e).y).innerText==e.innerText &&
		point(2, position(e).y).innerText==e.innerText);
	let diagonale = 
		(point(0,0).innerText==e.innerText &&
		point(1,1).innerText==e.innerText &&
		point(2,2).innerText==e.innerText)
		||
		(point(0,2).innerText==e.innerText &&
		point(1,1).innerText==e.innerText &&
		point(2,0).innerText==e.innerText);
	return (horizontale || verticale || diagonale);
}

function victoire(e) {
	let ok = confirm("Le joueur "+e.innerText+" a gagné.\n"+"Voulez-vous refaire un match ?");
	if (ok)
		initialiser();
}

function initialiser() {
	for (const e of grille) {
		e.innerText = "";
	}
	mouvement = 0;
	verification = false;
	joueur.innerText = "Au tour de O";
}
