var nombre=0;

setTimeout(function() { changerImage() }, 100);

function afficherImage(n) {
	if (n==1)
		document.getElementById("image").src="img/fb_krour.jpg";
	else if (n==2)
		document.getElementById("image").src="img/fb_dhamet.jpg";
	else if (n==3)
		document.getElementById("image").src="img/fb_tay.jpg";
	x = document.getElementsByClassName("point");
	for (var i = 0; i < x.length; i++) {
			x[i].style.backgroundColor = "transparent";
	}
	document.getElementById(n+"").style.backgroundColor = "rgb(10,10,10, 30%)";
}

function changerImage() {
	nombre=nombre+1;
	if (nombre==4) nombre=1;
	afficherImage(nombre);
	setTimeout(function() { changerImage() }, 3000);
}
