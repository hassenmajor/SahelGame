
const mode_bille = 12;
var maChambre;
var roleJoueur = false;

const audioPlayer = new Audio("raw/low_conga.wav");
const audioWinner = new Audio("raw/fairydust.wav");

var imgs = [];
imgs[0] = "img/bille_haut_transparent.png";
imgs[1] = "img/bille_droite_transparent.png";
imgs[2] = "img/bille_gauche_transparent.png";
imgs[3] = "img/bille_bas_transparent.png";

textDroite = document.getElementById("textDroite"); textDroite.textContent = 0;
textGauche = document.getElementById("textGauche"); textGauche.textContent = 0;


setTimeout(function() {
    for (var x=1; x<=12; x++)
    {
        image(chambre(x), mode_bille);
        chambre(x).addEventListener('click', function() {
            chambreClicked(this);
        });
        //
        nombre(x).textContent = mode_bille+"";
        nombre(x).style.color = "green";
    }
}, 200);

function image(cnv, n) {
	cnv.width = 300;
	cnv.height = 300;
	var context = cnv.getContext("2d");
    context.clearRect(0, 0, cnv.width, cnv.height);
    //
    for (var i=0; i<n; i++)
    {
        var img = new Image();
        img.src = bille();
        img.onload = function() {
            var a = Math.random()*2*Math.PI;
            var r = Math.random()*110;
            context.drawImage(img,
                    Math.floor(90+r*Math.cos(a)),
                    Math.floor(90+r*Math.sin(a)));
        }
    }
    //
    if (n==0)
    {
        setTimeout(() => {
            for (var x=1; x<=12; x++) {
                if (nombre(x).textContent==0) {
                    var context = chambre(x).getContext("2d");
                    context.clearRect(0, 0, cnv.width, cnv.height);
                }
            }
        }, 400);
    }
}
function imageOne(cnv) {
    var context = cnv.getContext("2d");
    //
    var img = new Image();
    img.src = bille();
    img.onload = function() {
        var a = Math.random()*2*Math.PI;
        var r = Math.random()*110;
        context.drawImage(img,
                Math.floor(90+r*Math.cos(a)),
                Math.floor(90+r*Math.sin(a)));
    }
}
function bille() {
    var n = Math.floor(Math.random()*4);
    return imgs[n];
}

function chambre(x) {
    if (x<1)
        return chambre(x+12);
    else if (1<=x && x<=6)
    	return document.getElementsByClassName("ligne")[1].getElementsByClassName("chambre")[6-x];
    else if (7<=x && x<=12)
    	return document.getElementsByClassName("ligne")[2].getElementsByClassName("chambre")[x-7];
    else if (12<x)
        return chambre(x-12);
    return null;
}
function nombre(x) {
    if (x<1)
        return nombre(x+12);
    else if (1<=x && x<=6)
    	return document.getElementsByClassName("ligne")[0].getElementsByClassName("nombre")[6-x];
    else if (7<=x && x<=12)
    	return document.getElementsByClassName("ligne")[3].getElementsByClassName("nombre")[x-7];
    else if (12<x)
        return nombre(x-12);
    return null;
}
function indice(chose) {
    return parseInt(chose.id.slice(7));
}


function compte(x) {
    return parseInt(nombre(x).textContent);
}
function compteJoueur(quelJoueur) {
    if (quelJoueur)
        return compte(1)+compte(2)+compte(3)+compte(4)+compte(5)+compte(6);
    else
        return compte(7)+compte(8)+compte(9)+compte(10)+compte(11)+compte(12);
}
function incrémenter(chambre) {
    var monNombre = nombre(indice(chambre));
    //
    imageOne(chambre);
    //
    monNombre.textContent = (parseInt(monNombre.textContent)+1)+"";
    if (parseInt(monNombre.textContent)<=mode_bille) monNombre.color = "green";
    else monNombre.color = "red";
}
function décrémenter(chambre, n) {
    var monNombre = nombre(indice(chambre));
    //
    image(chambre, n);
    //
    monNombre.textContent = n+"";
    monNombre.color = "green";
}

function augmenterScore(m) {
    audioWinner.play();
    if (indice(maChambre)>6)
    {
        textDroite.textContent = (parseInt(textDroite.textContent)+m)+"";
    }
    else
    {
        textGauche.textContent = (parseInt(textGauche.textContent)+m)+"";
    }
}

function chambreClicked(view) {
    maChambre = view;
    var n = parseInt( nombre(indice(maChambre)).textContent );
    if (n!=0)
    {
        if (compteJoueur(true)==0)
            roleJoueur = true;
        else if (compteJoueur(false)==0)
            roleJoueur = false;
        else if (indice(maChambre)>6 && !roleJoueur)
            roleJoueur = true;
        else if (indice(maChambre)<=6 && roleJoueur)
            roleJoueur = false;
        else
            return;
    }
    if (n==1)
    {
        audioPlayer.play();
        décrémenter(maChambre, 0);
        var postChambre = chambre(indice(maChambre)+1);
        incrémenter(postChambre);
        var m = parseInt( nombre(indice(postChambre)).textContent );
        if (m<=mode_bille && m%2==0)
        {
            augmenterScore(m);
            décrémenter(postChambre, 0);
        }
    }
    else if (n>1)
    {
        décrémenter(maChambre, 1);
        var postChambre = chambre(indice(maChambre));
        while (n>1)
        {
            audioPlayer.play();
            postChambre = chambre(indice(postChambre)+1);
            incrémenter(postChambre);
            n--;
        }
        var m = parseInt( nombre(indice(postChambre)).textContent );
        while (0<m && m<=mode_bille && m%2==0)
        {
            augmenterScore(m);
            décrémenter(postChambre, 0);
            postChambre = chambre(indice(postChambre)-1);
            m = parseInt( nombre(indice(postChambre)).textContent );
        }
    }
    if (parseInt(textDroite.textContent)+parseInt(textGauche.textContent)==12*mode_bille)
    {
        var winDialog;
        //
        if (parseInt(textDroite.textContent)==parseInt(textGauche.textContent))
            winDialog = "Egalisation !\n SCORE : "+parseInt(textDroite.textContent)+" × "+parseInt(textGauche.textContent);
        else
            winDialog = "Victoire !\n SCORE : "+getString(R.string.score)+" "+parseInt(textDroite.textContent)+" × "+parseInt(textGauche.textContent);
        //
        setTimeout(function() {
            audioWinner.play();
            alert(winDialog);
        }, 200);
    }
}
