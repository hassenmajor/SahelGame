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
var Solide = /** @class */ (function (_super) {
    __extends(Solide, _super);
    function Solide(masse, charge, taille, age) {
        var _this = _super.call(this, masse, charge) || this;
        // les données
        _this.taille = 0;
        _this.age = Number.POSITIVE_INFINITY;
        if (taille)
            _this.taille = taille;
        if (age)
            _this.age = age;
        return _this;
    }
    Solide.prototype.getDensité = function () {
        return this.masse / this.taille;
    };
    // Astres principaux
    Solide.TERRE = new Solide(5.98e24, 0, 2 * 6.37e6, 0);
    Solide.LUNE = new Solide(7.36e22, 0, 2 * 1.74e6, 0);
    Solide.SOLEIL = new Solide(1.99e30, 0, 2 * 6.96e8, 0);
    return Solide;
}(Corps));
