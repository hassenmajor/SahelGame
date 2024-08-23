
function give(x) {
    let y ;
    let z = Fraction___(x, Math.pow(10, -10)) ;
    if (z && z[1]!=1)
        y = z[0]+"/"+z[1] ;
    else
        if (Math.floor(x) == x)
            y = Math.floor(x) + "" ;
        else
            y = x + "" ;
    return '<strong style="color: blue">'+y+'</strong>' ;
}

function YES() {
    
    input = document.getElementById('input').value;
    while (input.indexOf(" ")>-1)
        input = input.replace(" ", "");

    var resultat;
    if (input.indexOf("=")==-1)
    {
        output = new Molécule(input).masse;
        resultat = "M( "+versIndice(input)+" ) = "+'<strong>'+output+'</strong>';
        
        if (input && output) {
            document.querySelector("#output").innerHTML = resultat;
        } else {
            NO();
        }
    }
    else
    {
        try {
            if (!OK(input))
                NO();
        } catch (error) {
            NO();
        }
    }

}

function NO() {
    document.querySelector("#output").innerHTML = "?";
}

function OK() {

    input = input.split("=");
    input = {
        réactifs: input[0].split("+"),
        produits: input[1].split("+")
    }
    
    output = Réaction.getRéaction(input.réactifs, input.produits).getCoéfficients();
    output0 = Fraction__(output, 1E-10);

    if (!output || output.length<2 || output[0]==undefined) {

        return false;

    } else {

        var resultat = "";
        for (i = 0; i < input.réactifs.length; i++)
            if (i==0)
                resultat = resultat+give(output[i])+" "+versIndice(input.réactifs[i]);
            else if (i<=input.réactifs.length)
                resultat = resultat+" + "+give(output[i])+" "+versIndice(input.réactifs[i]);
        for (j = 0; j < input.produits.length; j++)
            if (j==0)
                resultat = resultat+" = "+give(output[j+i])+" "+versIndice(input.produits[j]);
            else
                resultat = resultat+" + "+give(output[j+i])+" "+versIndice(input.produits[j]);

        resultat = resultat+"<br>";
        for (i = 0; i < input.réactifs.length; i++)
            if (i==0)
                resultat = resultat+give(output0[i])+" "+versIndice(input.réactifs[i]);
            else if (i<=input.réactifs.length)
                resultat = resultat+" + "+give(output0[i])+" "+versIndice(input.réactifs[i]);
        for (j = 0; j < input.produits.length; j++)
            if (j==0)
                resultat = resultat+" = "+give(output0[j+i])+" "+versIndice(input.produits[j]);
            else
                resultat = resultat+" + "+give(output0[j+i])+" "+versIndice(input.produits[j]);
        
        if (resultat.indexOf(".")>-1)
            return false;

        document.querySelector("#output").innerHTML = resultat;
        return true;

    }

    // console.log(Réaction.getRéaction(["HNO3", "Cu"],["Cu(NO3)2", "H2O", "NO"]).getCoéfficients());
    // console.log(Réaction.getRéaction(["KClO3"],["KCl","O2"]).getCoéfficients());

}

document.querySelector("#equilibrer").addEventListener('click', function(event) {
    YES();
});

document.addEventListener("keydown", function(event) {
	if (event.key==="Enter")
        YES();
});
