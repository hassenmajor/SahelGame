var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Molécule = /** @class */ (function (_super) {
    __extends(Molécule, _super);
    // les constructeurs
    function Molécule(formuleBrute, produitFacteursPremiers, elements, effectifs) {
        var _this = _super.call(this) || this;
        if (formuleBrute)
            _this.MoléculeDepuisFormule(formuleBrute);
        else if (produitFacteursPremiers)
            _this.MoléculeDepuisCode(produitFacteursPremiers);
        else if (elements && effectifs)
            _this.MoléculeDepuisAtomes(elements, effectifs);
        return _this;
    }
    Molécule.prototype.MoléculeDepuisAtomes = function (elements, effectifs) {
        if (elements.length == effectifs.length) {
            this.produitFacteursPremiers = 1;
            for (var i = 0; i < effectifs.length; i++) {
                // Calculer le produit de facteurs premiers
                this.produitFacteursPremiers = this.produitFacteursPremiers *
                    Math.pow(elements[i].nombrePremier, effectifs[i]);
            }
            this.calculer();
        }
    };
    Molécule.prototype.MoléculeDepuisFormule = function (formuleBrute) {
        var x = formuleBrute.replace(" ", "");
        // Calculer le produit de facteurs premiers
        // x = versExposant(x);
        for (var i = 0; i < ATOM_LIST.length; i++)
            if (ATOM_LIST[i].length == 2)
                while (x.indexOf(ATOM_LIST[i]) != -1)
                    x = x.replace(new RegExp(ATOM_LIST[i]), "(" + NOMBRE_PREMIER[i] + ")");
        for (var i = 0; i < ATOM_LIST.length; i++)
            if (ATOM_LIST[i].length == 1)
                while (x.indexOf(ATOM_LIST[i]) != -1)
                    x = x.replace(new RegExp(ATOM_LIST[i]), "(" + NOMBRE_PREMIER[i] + ")");
        for (var _i = 0, CHIFFRE_1 = CHIFFRE; _i < CHIFFRE_1.length; _i++) {
            var i = CHIFFRE_1[_i];
            while (x.indexOf(")" + i) != -1)
                x = x.replace(")" + i, ")^" + i);
            while (x.indexOf(i + "(") != -1)
                x = x.replace(i + "(", i + "*(");
        }
        this.produitFacteursPremiers = Valeur(x);
        this.calculer();
    };
    Molécule.prototype.MoléculeDepuisCode = function (produitFacteursPremiers) {
        this.produitFacteursPremiers = produitFacteursPremiers;
        this.calculer();
    };
    Molécule.prototype.calculer = function () {
        var elements = this.getAtomes();
        var effectifs = this.getEffectifs();
        this.masse = 0;
        this.formuleBrute = "";
        for (var i = 0; i < elements.length; i++) {
            // Calculer la masse molaire
            this.masse = this.masse + effectifs[i] * elements[i].masse;
            // Déterminer la formule brute
            if (effectifs[i] == 1)
                this.formuleBrute = this.formuleBrute + elements[i].getSymbole();
            else
                this.formuleBrute = this.formuleBrute + elements[i].getSymbole() + versIndice(effectifs[i] + "");
        }
    };
    // les getteurs
    Molécule.prototype.getFormuleBrute = function () {
        return this.formuleBrute;
    };
    Molécule.prototype.getProduitFacteursPremiers = function () {
        return this.produitFacteursPremiers;
    };
    Molécule.prototype.getAtomes = function () {
        var x = this.produitFacteursPremiers;
        var y = [];
        for (var i = 0; i < NOMBRE_PREMIER.length; i++) {
            if ((x % NOMBRE_PREMIER[i]) === 0)
                y.push(i + 1);
        }
        return Atome.valueOf(y);
    };
    Molécule.prototype.getEffectifs = function () {
        var x = this.getAtomes();
        var y = [];
        for (var i = 0; i < x.length; i++)
            y[i] = this.getEffectif(x[i]);
        return y;
    };
    Molécule.prototype.getEffectif = function (element) {
        var x = this.produitFacteursPremiers;
        var y = 0;
        while (x % element.nombrePremier === 0) {
            x = x / element.nombrePremier;
            y++;
        }
        return y;
    };
    Molécule.prototype.getEffectifTotal = function () {
        var y = 0;
        for (var _i = 0, _a = this.getAtomes(); _i < _a.length; _i++) {
            var element = _a[_i];
            y = y + this.getEffectif(element);
        }
        return y;
    };
    Molécule.prototype.equals = function (obj) {
        return (obj instanceof Molécule) && obj.getProduitFacteursPremiers() === this.produitFacteursPremiers;
    };
    Molécule.valueOf = function (element) {
        return new Molécule(undefined, undefined, [element], [1]);
    };
    Molécule.valuesOf = function (formuleBrute) {
        var x = formuleBrute;
        var y = [];
        for (var i = 0; i < x.length; i++)
            y[i] = new Molécule(x[i]);
        return y;
    };
    return Molécule;
}(Corps));
