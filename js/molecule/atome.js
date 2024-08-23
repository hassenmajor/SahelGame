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
var Atome = /** @class */ (function (_super) {
    __extends(Atome, _super);
    // les constructeurs
    function Atome(Z, symbole) {
        var _this = _super.call(this) || this;
        if (Z)
            _this.AtomeDepuisNombre(Z);
        else if (symbole)
            _this.AtomeDepuisSymbole(symbole);
        return _this;
    }
    Atome.prototype.AtomeDepuisNombre = function (Z) {
        if (1 <= Z && Z <= 118) {
            this.protons = Z;
            this.symbole = ATOM_LIST[this.protons - 1];
            this.nombrePremier = NOMBRE_PREMIER[this.protons - 1];
            this.masse = MOLAR_LIST[this.protons - 1];
        }
    };
    Atome.prototype.AtomeDepuisSymbole = function (symbole) {
        for (var Z = 1; Z <= ATOM_LIST.length; Z++)
            if (ATOM_LIST[Z - 1] == symbole) {
                this.protons = Z;
                this.symbole = ATOM_LIST[this.protons - 1];
                this.nombrePremier = NOMBRE_PREMIER[this.protons - 1];
                this.masse = MOLAR_LIST[this.protons - 1];
            }
    };
    // les getteurs
    Atome.prototype.getSymbole = function () {
        return this.symbole;
    };
    Atome.prototype.getProtons = function () {
        return this.protons;
    };
    Atome.prototype.getNombrePremier = function () {
        return this.nombrePremier;
    };
    Atome.prototype.equals = function (obj) {
        return (obj instanceof Atome) && obj.getNombrePremier() === this.nombrePremier;
    };
    Atome.valueOf = function (numerosAtomiques) {
        var x = [];
        for (var i = 0; i < numerosAtomiques.length; i++)
            x.push(new Atome(numerosAtomiques[i]));
        return x;
    };
    Atome.binarySearch = function (a, key) {
        for (var i = 0; i < a.length; i++)
            if (a[i].equals(key))
                return i;
        return -1;
    };
    return Atome;
}(Corps));
