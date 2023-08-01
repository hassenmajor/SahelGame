
var ancienPion;
var tags = [];
function setTag(p, n) {
	tags[indiceXY(p)[0]][indiceXY(p)[1]] = n;
}
function getTag(p) {
	return tags[indiceXY(p)[0]][indiceXY(p)[1]];
}
var mode_pion = 36;

const audioPlayer = new Audio("raw/muted_conga.wav");
const audioWinner = new Audio("raw/fairydust.wav");

for (var x = 0; x < 9; x++) {
	tags[x] = [];
	for (var y = 0; y < 9; y++) {
		var p = document.getElementsByClassName("ligne")[x].getElementsByClassName("place")[y];
		if (9*x+(y+1)<=mode_pion) {
	        setTag(pion(x, y), 2);
	        pion(x, y).src = "img/pion_noir.png";
	    } else if (9*x+(y+1)>81-mode_pion) {
	        setTag(pion(x, y), 1);
	        pion(x, y).src = "img/pion_blanc.png";
	    } else {
	        setTag(pion(x, y), 0);
	        pion(x, y).style.visibility = "hidden";
	    }
		p.addEventListener('click', function() {
				pionClicked(this.getElementsByClassName("pion")[0]);
			});
	}
}

function pion(x, y) {
    return document.getElementsByClassName("ligne")[x].getElementsByClassName("pion")[y];
}

function indiceXY(p) {
    return [parseInt(p.id.slice(4, 5)), parseInt(p.id.slice(5, 6))];
}
/*
// Tracer le damier
setTimeout(function() {

	var damier = document.getElementById("damier");
	var canvas = document.createElement("canvas");
	canvas.width = 1000;
	canvas.height = 1000;
	var context = canvas.getContext("2d");
	var taille = 500;
	//
	context.beginPath();
	context.strokeStyle = "grey";
	context.lineWidth = 1;
	for (var x=taille/8; x<taille; x+=taille/4) {
        // lignes horizontales et verticales
		context.moveTo(x, 0);
		context.lineTo(x, taille);
		context.moveTo(0, x);
		context.lineTo(taille, x);
	}
	context.stroke();
	context.beginPath();
	context.lineWidth = 3;
    for (var x=0; x<=taille; x+=taille/4) {
        // lignes horizontales et verticales
		context.moveTo(x, 0);
		context.lineTo(x, taille);
		context.moveTo(0, x);
		context.lineTo(taille, x);
        // lignes croissantes
		context.moveTo(x, 0);
		context.lineTo(0, x);
		context.moveTo(taille+x, 0);
		context.lineTo(0, taille+x);
        // lignes décroissantes
		context.moveTo(x, 0);
		context.lineTo(taille, taille-x);
		context.moveTo(0, x);
		context.lineTo(taille-x, taille);
    }
	context.stroke();
	//
	damier.style.background = "url("+canvas.toDataURL()+")";

}, 200);
*/
function pionClicked(view) {
	//view.style.visibility = "hidden";
	var nouveauPion = view;
    if (getTag(nouveauPion)!=0)
    {
        if (ancienPion!=null)
            ancienPion.style.background = "transparent";
        ancienPion = nouveauPion;
        ancienPion.style.background = "lightblue";
    }
    else if (ancienPion!=null)
    {
        var ancienXY = indiceXY(ancienPion);
        var nouveauXY = indiceXY(nouveauPion);
        var distanceXY = [nouveauXY[0]-ancienXY[0], nouveauXY[1]-ancienXY[1]];
        var norme = Math.sqrt( Math.pow(distanceXY[0], 2) + Math.pow(distanceXY[1], 2) );
        if ( norme==1 || (norme==Math.sqrt(2) && ancienXY[0]%2==ancienXY[1]%2) )
        {
            //if ((int)ancienPion.getTag()>=3 || ((int)ancienPion.getTag()==1 && distanceXY[0]<=0) || ((int)ancienPion.getTag()==2 && distanceXY[0]>=0))
                bougerPion(nouveauPion);
        }
        else if ( getTag(ancienPion)<=2 && (norme==2 || (norme==Math.sqrt(8) && ancienXY[0]%2==ancienXY[1]%2)) )
        {
            var moyenXY = [(ancienXY[0]+nouveauXY[0])/2, (ancienXY[1]+nouveauXY[1])/2];
            var moyenPion = pion(moyenXY[0], moyenXY[1]);
            if (getTag(moyenPion)!=0 && getTag(moyenPion)%2!=getTag(ancienPion)%2)
            {
                compterPion(moyenPion);
                //
                moyenPion.style.visibility = "hidden";
                setTag(moyenPion, 0);
                //
                bougerPion(nouveauPion);
            }
        }
        else if (getTag(ancienPion)>=3)
        {
            //Toast.makeText(GameActivity.this, distanceXY[0]+" ; "+distanceXY[1], Toast.LENGTH_LONG).show();
            if ( distanceXY[0]==0
                    || distanceXY[1]==0
                    || (Math.abs(distanceXY[0])==Math.abs(distanceXY[1]) && ancienXY[0]%2==ancienXY[1]%2) )
            {
                if (Math.abs(distanceXY[0])==Math.abs(distanceXY[1]))
                    norme = Math.abs(distanceXY[0]);
                var moyenNombre = 0;
                var moyenXY = [(ancienXY[0]+distanceXY[0]/norme), (ancienXY[1]+distanceXY[1]/norme)];
                var moyenPion = null;
                while (!(moyenXY[0]==nouveauXY[0] && moyenXY[1]==nouveauXY[1]))
                {
                    if (getTag(pion(moyenXY[0], moyenXY[1]))>0)
                    {
                        moyenNombre++;
                        moyenPion = pion(moyenXY[0], moyenXY[1]);
                    }
                    moyenXY[0]+=distanceXY[0]/norme;
                    moyenXY[1]+=distanceXY[1]/norme;
                }
                if (moyenNombre==0)
                {
                    bougerPion(nouveauPion);
                }
                else if (moyenNombre==1 && getTag(moyenPion)%2!=getTag(ancienPion)%2)
                {
                    compterPion(moyenPion);
                    //
                    moyenPion.style.visibility = "hidden";
                    setTag(moyenPion, 0);
                    //
                    bougerPion(nouveauPion);
                }
            }
        }
    }
}

function bougerPion(nouveauPion) {
	audioPlayer.play();
    switch (getTag(ancienPion))
    {
        case 1:
            nouveauPion.src = "img/pion_blanc.png";
            setTag(nouveauPion, 1);
            if (indiceXY(nouveauPion)[0]>0) break;
        case 3:
            nouveauPion.src = "img/pion_blanc_royal.png";
            setTag(nouveauPion, 3);
            break;
        case 2:
            nouveauPion.src = "img/pion_noir.png";
            setTag(nouveauPion, 2);
            if (indiceXY(nouveauPion)[0]<8) break;
        case 4:
            nouveauPion.src = "img/pion_noir_royal.png";
            setTag(nouveauPion, 4);
            break;
    }
    nouveauPion.style.visibility = "visible";
    ancienPion.style.background = "transparent";
    ancienPion.style.visibility = "hidden";
    setTag(ancienPion, 0);
    ancienPion = null;
}

var pionBlancMort = 0;
var pionNoirMort = 0;
function compterPion(moyenPion)
{
    if (getTag(moyenPion)%2==1)
        pionBlancMort++;
    else
        pionNoirMort++;
    //
    if (pionBlancMort==mode_pion || pionNoirMort==mode_pion)
    {
        var winDialog;
        //
        if (pionBlancMort==mode_pion)
            winDialog = "L\'équipe noire a gagné";
        else if (pionNoirMort==mode_pion)
            winDialog = "L\'équipe blanche a gagné";
        //
        setTimeout(function() {
            audioWinner.play();
            alert(winDialog);
        }, 200);
    }
}
