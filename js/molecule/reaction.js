var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Réaction = /** @class */ (function () {
    function Réaction(réactifs, produits) {
        this.Réactifs = réactifs;
        this.Produits = produits;
    }
    Réaction.getRéaction = function (réactifs, produits) {
        return new Réaction(Molécule.valuesOf(réactifs), Molécule.valuesOf(produits));
    };
    Réaction.prototype.getCoéfficients = function () {
        var m = Réaction.matriceRéaction(this.Réactifs, this.Produits);
        if (Déterminant(m) != 0) {
            var x = [];
            x.length = this.Réactifs.length + this.Produits.length;
            m = Inverse(m);
            for (var i = 0; i < x.length; i++)
                x[i] = m[i][0];
            return x;
        }
        return [];
    };
    Réaction.matriceCarrée = function (systèmeLinéaire) {
        var M = systèmeLinéaire;
        if (M.length == M[0].length) {
            return M;
        }
        else if (M.length > M[0].length) {
            for (var i = 1; i < M.length; i++)
                for (var k = i + 1; k < M.length; k++)
                    if (Produit(M[i][0] / M[k][0], M[k]) === M[i]) {
                        var m = __spreadArray(__spreadArray([], M.slice(0, k), true), M.slice(k + 1, M.length), true);
                        return Réaction.matriceCarrée(m);
                    }
        }
        return M;
    };
    Réaction.matriceRéaction = function (Réactifs, Produits) {
        var l = mélange(Réactifs).getAtomes();
        if (l.length !== mélange(Produits).getAtomes().length)
            return [];
        // for (let a of mélange(Produits).getAtomes()) {
        //     if (l.indexOf(a)==-1)
        //         return [];
        // }
        var c = Réactifs.length + Produits.length;
        var x = [[]];
        x.length = l.length + 1;
        x[0].length = c;
        x[0][0] = 1;
        for (var j = 1; j < c; j++)
            x[0][j] = 0;
        for (var i = 1; i < l.length + 1; i++) {
            x[i] = [];
            for (var j = 0; j < c; j++)
                if (j < Réactifs.length)
                    x[i][j] = Réactifs[j].getEffectif(l[i - 1]);
                else
                    x[i][j] = -Produits[j - Réactifs.length].getEffectif(l[i - 1]);
        }
        if (x.length === x[0].length) {
            return x;
        }
        else if (x.length > x[0].length) {
            x = Réaction.matriceCarrée(x);
            if (x.length == x[0].length)
                return x;
            var ProduitsPlus = [];
            ProduitsPlus.length = Produits.length + 1;
            ProduitsPlus = Produits.slice(0, Produits.length);
            var L = [];
            var Espèce = [];
            Espèce = __spreadArray(__spreadArray([], Réactifs.slice(0, Réactifs.length), true), Produits.slice(0, Produits.length), true);
            for (var i = 0; i < c; i++)
                if (Espèce[i].getAtomes().length == 1)
                    L = __spreadArray(__spreadArray([], L, true), [Espèce[i].getAtomes()[0]], false);
            for (var i = 0; i < l.length; i++)
                if (Atome.binarySearch(L, l[i]) < 0) {
                    ProduitsPlus[Produits.length] = Molécule.valueOf(l[i]);
                    x = Réaction.matriceRéaction(Réactifs, ProduitsPlus);
                    return x;
                }
        }
        return [];
    };
    Réaction.prototype.getRéactifs = function () {
        return this.Réactifs;
    };
    Réaction.prototype.getProduits = function () {
        return this.Produits;
    };
    return Réaction;
}());
